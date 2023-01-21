/** @jsx JSXDom.h */
import { RefObject } from 'preact';
import * as JSXDom from 'jsx-dom';
import AnchorJS from 'anchor-js';
import slugify from '@sindresorhus/slugify';
import Config from '../../../Config';
import {
  CodeblockVariant,
  CODEBLOCK_PROCESSED_CLASS,
  CODEBLOCK_TITLE_CLASS,
} from './codeblockConsts';
import { createEnhancedCodeBlock } from './createEnhancedCodeBlock';

/**
 * A custom hook that enhances code blocks that are longer than two lines.
 * These enhancecd code blocks show line numbers, and can optionally highlight
 * lines.
 *
 * This method is the main entrypoint for enhancing code blocks.
 *
 * @param mainElRef A ref to the `<main>` element from MainContent
 */
export default function useEnhancedCodeBlocks(
  mainElRef: RefObject<HTMLElement>,
): () => void {
  if (!mainElRef.current) {
    throw new Error(
      'Primer Spec: Main Content: Expected main content ref to be initialized.',
    );
  }

  // First enhance codeblocks formatted by Jekyll + Rouge
  const numCodeBlocks = enhanceBlocks(
    mainElRef.current.querySelectorAll('div.highlighter-rouge'),
    getCodeElFromJekyllRougeCodeblock,
    0,
  );
  // Then attempt to enhance ordinary <pre> blocks.
  enhanceBlocks(
    mainElRef.current.querySelectorAll('pre'),
    getCodeElFromPreCodeblock,
    numCodeBlocks,
  );

  return () => {};
}

function getCodeElFromJekyllRougeCodeblock(
  codeblock: HTMLElement,
): HTMLElement | null {
  // The original structure of a codeblock:
  // <div
  //   class="highlighter-rouge language-[lang]"
  //   data-highlight="[highlight-range]" {/* OPTIONAL */}
  //   data-variant="[legacy|enhanced]"   {/* OPTIONAL */}
  //   data-title="[title]"               {/* OPTIONAL */}
  // >
  //   <div class="highlight">
  //     <pre class="highlight">
  //       <code>
  //         [contents]
  //       </code>
  //     </pre>
  //   </div>
  // </div>
  //
  // Notice that `contents` is wrapped in a pre-formatted block. Hence, we will
  // use newlines in `contents` to demarcate lines, and we need to preserve
  // whitespace within the line.
  const codeEl =
    codeblock.firstElementChild?.firstElementChild?.firstElementChild;
  if (codeEl == null) {
    console.warn(
      'useEnhancedCodeBlocks: Code Block has malformed structure. See Primer Spec Docs for expected structure. https://github.com/eecs485staff/primer-spec/blob/main/docs/USAGE_ADVANCED.md#enhanced-code-blocks',
      'codeblock',
      codeblock,
    );
    return null;
  }

  return codeEl as HTMLElement;
}

function getCodeElFromPreCodeblock(codeblock: HTMLElement): HTMLElement | null {
  // The structure of a <pre> codeblock:
  // <pre>
  //   <code> <!-- OPTIONAL -->
  //     [contents]
  //   </code>
  // </pre>
  if (
    codeblock.childNodes.length === 1 &&
    codeblock.firstElementChild?.tagName === 'CODE'
  ) {
    return codeblock.firstElementChild as HTMLElement;
  }
  return codeblock;
}

/**
 * Gather metadata about the code block, create the code block, then replace
 * the existing DOM node with the new enhanced code block.
 *
 * @param codeblocks Output from `.querySelectorAll()`
 * @param getContents A method that extracts a string with the codeblock contents given a codeblock element
 * @param startId The ID to use for the first enhanced code block
 */
function enhanceBlocks(
  codeblocks: NodeListOf<HTMLElement>,
  getCodeEl: (node: HTMLElement) => HTMLElement | null,
  startId = 0,
): number {
  let nextCodeBlockId = startId;

  [...codeblocks]
    .filter(
      (codeblock: HTMLElement) =>
        codeblock.querySelector(`.${CODEBLOCK_PROCESSED_CLASS}`) == null &&
        codeblock.closest(`.${CODEBLOCK_PROCESSED_CLASS}`) == null,
    )
    .forEach((codeblock) => {
      if (shouldRetainLegacyCodeBlock(codeblock)) {
        // We decided not to enhance this block. Mark it as processed.
        codeblock.classList.add(CODEBLOCK_PROCESSED_CLASS);
        return;
      }
      const codeblockNumericId = nextCodeBlockId++;

      const codeblockParent = codeblock.parentElement;
      if (!codeblockParent) {
        console.warn('useEnhancedCodeBlocks: Codeblock missing parent');
        return;
      }

      const codeblockContentsEl = getCodeEl(codeblock);
      if (codeblockContentsEl == null) {
        return;
      }
      const codeblockContents = getCodeblockContents(codeblockContentsEl);

      const title = codeblock.dataset['title'] || null;
      const anchorId = title
        ? createCodeBlockAnchorId(codeblockNumericId, title)
        : null;

      const enhancedCodeBlock = createEnhancedCodeBlock({
        codeblockNumericId,
        rawContent: codeblockContents,
        language: getCodeBlockLanguage(codeblock),
        rawHighlightRanges: codeblock.dataset['highlight'] || null,
        title,
        anchorId,
        showLineNumbers:
          getCodeblockVariant(codeblock, codeblockContents) !==
          CodeblockVariant.NO_LINE_NUMBERS,
      });
      if (!enhancedCodeBlock) {
        return;
      }

      // Clear the old code block and replace with the enhanced block
      codeblockParent.replaceChild(
        <div id={anchorId ?? undefined} class="primer-spec-code-block">
          {enhancedCodeBlock}
        </div>,
        codeblock,
      );
    });

  // We need to add anchors to Code Block titles if applicable
  new AnchorJS().add(`.${CODEBLOCK_TITLE_CLASS}`);

  return nextCodeBlockId;
}

function shouldRetainLegacyCodeBlock(codeblock: HTMLElement): boolean {
  // Don't mess with Mermaid blocks, they'll be handled by the Mermaid plugin.
  if (codeblock.querySelector('.language-mermaid') != null) {
    return true;
  }
  return getCodeblockVariant(codeblock) === CodeblockVariant.LEGACY;
}

function getCodeblockVariant(
  codeblock: HTMLElement,
  rawContent?: string,
): CodeblockVariant {
  const rawVariant = codeblock.dataset[
    'variant'
  ]?.toLowerCase() as CodeblockVariant | null;
  if (rawVariant && Object.values(CodeblockVariant).includes(rawVariant)) {
    return rawVariant as CodeblockVariant;
  }

  // Special handling if:
  // - A codeblock does not specify a variant
  // - The default code block variant is "enhanced" (aka show line numbers)
  // - The codeblock has only one line
  // Then DO NOT show line numbers. I've come to believe that line numbers
  // look confusing in single-line codeblocks.
  const codeblockHasOnlyOneLine = rawContent
    ? !rawContent.trim().includes('\n')
    : false;
  if (
    Config.DEFAULT_CODEBLOCK_VARIANT === CodeblockVariant.ENHANCED &&
    codeblockHasOnlyOneLine
  ) {
    return CodeblockVariant.NO_LINE_NUMBERS;
  }

  return Config.DEFAULT_CODEBLOCK_VARIANT;
}

/***********/
/** UTILS **/
/***********/

/**
 * Given an element, return the codeblock's language (if present) if the
 * element's `classList` contains a class of the form `language-[language]`.
 */
function getCodeBlockLanguage(codeblockSrc: Element): string | null {
  for (const className of codeblockSrc.classList) {
    if (className.startsWith('language-')) {
      return className.replace('language-', '');
    }
  }
  return null;
}

function createCodeBlockAnchorId(
  codeblockNumericId: number,
  title: string,
): string {
  return `${slugify(title)}-${codeblockNumericId}`;
}

/**
 * Given a codeblock / pre element, return a string reprensenting the HTML of
 * the codeblock.
 *
 * One edge case that this method handles: Lines split within a single span.
 * Consider the following codeblock (observe lines 3-4):
 * ```html
 *   <code><span class="c">Line 1</span>
 *   <span class="c">Line 2</span>
 *   <span class="c">Line 3
 *   Line 4</span></code>
 * ```
 * Since the rest of the code assumes that "\n" characters separate lines, we
 * need to ensure that each line starts with its own span if necessary. The
 * output of this method should be:
 * ```html
 *   <code><span class="c">Line 1</span>
 *   <span class="c">Line 2</span>
 *   <span class="c">Line 3</span>
 *   <span class="c">Line 4</span></code>
 * ```
 */
function getCodeblockContents(codeEl: HTMLElement): string {
  const resultNode = codeEl.cloneNode() as HTMLElement;
  codeEl.childNodes.forEach((childNode) => {
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      if (
        (childNode as HTMLElement).tagName === 'SPAN' &&
        childNode.textContent != null
      ) {
        const lines = childNode.textContent.split('\n');
        lines.forEach((line, i) => {
          // Ignore empty lines within a span, but still insert the \n.
          if (line) {
            const lineEl = childNode.cloneNode() as HTMLElement;
            lineEl.textContent = line;
            resultNode.appendChild(lineEl);
          }
          // Append a new line except after the last line in this span
          if (i < lines.length - 1) {
            resultNode.appendChild(document.createTextNode('\n'));
          }
        });
      }
    } else {
      resultNode.appendChild(childNode.cloneNode(true));
    }
  });
  return resultNode.innerHTML;
}
