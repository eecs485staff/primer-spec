/** @jsx JSXDom.h */
import { RefObject } from 'preact';
import * as JSXDom from 'jsx-dom';
import clsx from 'clsx';

const CODEBLOCK_LINE_CLASS = 'primer-spec-code-block-line-code';
// We perform special handling for blocks in the `console` language: If a user
// clicks the line number, the entire line will be highlighted EXCLUDING the
// prompt (`$`) at the beginning, if it exists.
// See the special handling in `createCodeBlockLine()`.
const LANGUAGE_CONSOLE = 'console';

// We use this to keep track of click-then-drag on line numbers to select
// multiple lines simultaneously.
let mouseDownStartLine: number | null = null;

/**
 * A custom hook that enhances code blocks that are longer than two lines.
 * These enhancecd code blocks show line numbers, and can optionally highlight
 * lines.
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
    getRawContentsFromJekyllRougeCodeblock,
    0,
  );
  // Then attempt to enhance ordinary <pre> blocks.
  enhanceBlocks(
    mainElRef.current.querySelectorAll('pre'),
    (codeblock: HTMLElement) => codeblock.innerHTML.trim(),
    numCodeBlocks,
  );

  return () => {};
}

function getRawContentsFromJekyllRougeCodeblock(
  codeblock: HTMLElement,
): string | null {
  // The original structure of a codeblock:
  // <div
  //   class="highlighter-rouge language-[lang]"
  //   data-highlight="[highlight-range]" {/* OPTIONAL */}
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
  const codeEl = codeblock.firstChild?.firstChild?.firstChild;
  if (codeEl == null) {
    console.warn(
      'useEnhancedCodeBlocks: Code Block has malformed structure. See Primer Spec Docs for expected structure. https://github.com/eecs485staff/primer-spec/blob/main/docs/USAGE_ADVANCED.md#enhanced-code-blocks',
      'codeblock',
      codeblock,
    );
    return null;
  }

  return (codeEl as HTMLElement).innerHTML;
}

/**
 * @param codeblocks Output from `.querySelectorAll()`
 * @param getContents A method that extracts a string with the codeblock contents given a codeblock element
 * @param startId The ID to use for the first enhanced code block
 */
function enhanceBlocks(
  codeblocks: NodeListOf<HTMLElement>,
  getContents: (node: HTMLElement) => string | null,
  startId = 0,
): number {
  let nextCodeBlockId = startId;

  codeblocks.forEach((codeblock) => {
    const codeblockNumericId = nextCodeBlockId++;

    const codeblockParent = codeblock.parentElement;
    if (!codeblockParent) {
      console.warn('useEnhanccedCodeBlocks: Codeblock missing parent');
      return;
    }

    const codeblockContents = getContents(codeblock);
    if (codeblockContents == null) {
      return;
    }

    const enhancedCodeBlock = createEnhancedCodeBlock(
      codeblockNumericId,
      codeblockContents,
      getCodeBlockLanguage(codeblock),
      codeblock.getAttribute('data-highlight'),
    );
    if (!enhancedCodeBlock) {
      console.warn(
        'useEnhancedCodeBlocks: Code Block was not created successfully.',
        'codeblockId',
        codeblockNumericId,
      );
      return;
    }

    // Clear the old code block and replace with the enhanced block
    codeblockParent.replaceChild(
      <div class="primer-spec-code-block">{enhancedCodeBlock}</div>,
      codeblock,
    );
  });

  return nextCodeBlockId;
}

function createEnhancedCodeBlock(
  codeblockNumericId: number,
  rawContent: string,
  language: string | null,
  rawHighlightRanges: string | null,
): HTMLElement | null {
  const lines = rawContent.split('\n');
  if (lines.length === 0) {
    console.warn('useEnhancedCodeBlocks: Code Block appears to have no lines!');
    return null;
  }
  const lastLine = lines[lines.length - 1];
  if (lastLine === '' || lastLine === '</span>') {
    lines.pop();
  }

  const highlightRanges = parseCodeHighlightRanges(
    rawHighlightRanges,
    lines.length,
  );

  const codeblockId = `primer-spec-code-block-${codeblockNumericId}`;

  const enhancedCodeBlock = (
    <div id={codeblockId} class="Box mt-3 text-mono">
      <div class="Box-body p-0 primer-spec-code-block-body">
        <table class="highlight">
          {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <tbody
            onMouseOver={(e) => {
              if (mouseDownStartLine != null && e.target != null) {
                let el = e.target as HTMLElement | null;
                while (el && el.tagName !== 'TABLE') {
                  const match = el.id.match(
                    /^primer-spec-code-block-(?:\d+)-L(?:C|R)?(\d+)$/,
                  );
                  if (match && match[1] != null) {
                    selectLines(codeblockId, mouseDownStartLine, +match[1]);
                    break;
                  } else {
                    el = el.parentNode as HTMLElement;
                  }
                }
              }
            }}
            onMouseLeave={() => {
              mouseDownStartLine = null;
            }}
            onMouseUp={() => {
              mouseDownStartLine = null;
            }}
          >
            {lines.map((line, lineNumber) =>
              createCodeBlockLine(
                codeblockId,
                language,
                line,
                lineNumber + 1,
                highlightRanges.has(lineNumber + 1),
              ),
            )}
          </tbody>
        </table>
        {lines.length > 1 ? genCopyButton(codeblockId) : null}
      </div>
    </div>
  );
  return enhancedCodeBlock as HTMLElement;
}

function createCodeBlockLine(
  codeblockId: string,
  language: string | null,
  line: string,
  lineNumber: number,
  shouldHighlight: boolean,
): HTMLElement {
  const L_ID = `${codeblockId}-L${lineNumber}`;
  const LC_ID = `${codeblockId}-LC${lineNumber}`;
  const LR_ID = `${codeblockId}-LR${lineNumber}`;
  const codeblockLine = (
    <tr id={LR_ID}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <td
        id={L_ID}
        class="primer-spec-code-block-line-number"
        data-line-number={lineNumber}
        onMouseDown={(e) => {
          e.preventDefault();
          mouseDownStartLine = lineNumber;
          selectLines(codeblockId, mouseDownStartLine, mouseDownStartLine);
        }}
      />
      <td
        id={LC_ID}
        class={clsx(
          CODEBLOCK_LINE_CLASS,
          shouldHighlight && 'primer-spec-code-block-highlighted',
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: line }}
      />
    </tr>
  ) as HTMLElement;

  // SPECIAL HANDLING for `console` blocks: When a user clicks the line number
  // to select the entire line, attempt to exclude the leading prompt
  // symbol (`$`).
  if (language === LANGUAGE_CONSOLE) {
    const codeLine = codeblockLine.querySelector(
      `.${CODEBLOCK_LINE_CLASS}`,
    ) as HTMLElement;
    const firstChild = codeLine.firstChild as HTMLElement | null;
    if (firstChild?.tagName === 'SPAN' && firstChild.classList.contains('gp')) {
      // This prompt needs to be excluded from selection.
      // (1) Remove the original LC_ID
      codeLine.id = '';
      // (2) Find children to exclude from selection. Do this by searching for
      //     the first child that is not of class `gp` (Generic::Prompt) or
      //     `w` (Whitespace)
      const children = [...codeLine.childNodes];
      const childrenToExcludeFromSelection = [];
      let i = 0;
      for (; i < children.length; ++i) {
        const child = children[i] as HTMLElement;
        if (
          'classList' in child &&
          (child.classList.contains('gp') || child.classList.contains('w'))
        ) {
          childrenToExcludeFromSelection.push(child);
        } else {
          break;
        }
      }
      const childrenToIncludeInSelection = children.slice(i);
      // (3) Wrap remaining children in a new <span> with id=LC_ID.
      codeLine.innerHTML = '';
      codeLine.appendChild(<span>{childrenToExcludeFromSelection}</span>);
      codeLine.appendChild(
        <span id={LC_ID}>{childrenToIncludeInSelection}</span>,
      );
    }
  }

  return codeblockLine;
}

function genCopyButton(codeblockId: string) {
  return (
    <div class="primer-spec-zeroclipboard-container position-absolute top-0 right-0">
      <button
        type="button"
        class="btn-octicon no-print m-2 p-2 tooltipped tooltipped-no-delay tooltipped-n"
        tabIndex={0}
        aria-label="Copy"
        onClick={async (e) => {
          const codeblock = document.getElementById(codeblockId);
          if (codeblock) {
            // (1) Copy the lines to the clipboard
            const lines = codeblock.querySelectorAll(
              `.${CODEBLOCK_LINE_CLASS}`,
            );
            const text = [...lines]
              .map((line) => (line as HTMLElement).innerText)
              .join('\n');
            await navigator.clipboard.writeText(text);

            // (2) Fetch the copy-button
            let btn = e.target as HTMLElement | null;
            if (btn?.tagName === 'I') {
              btn = btn.parentElement;
            }
            if (!btn) {
              return;
            }

            // (3) Temporarily change the label and icon of the button
            const originalLabel = btn.getAttribute('aria-label');
            btn.setAttribute('aria-label', 'Copied!');
            const originalIcon = btn.firstChild;
            if (!originalIcon) {
              return;
            }
            btn.innerText = '';
            btn.appendChild(<i class="fas fa-check" />);
            setTimeout(() => {
              if (!btn) {
                return;
              }
              btn.setAttribute('aria-label', originalLabel || '');
              btn.blur();
              btn.innerText = '';
              btn.appendChild(originalIcon);
            }, 2000);
          }
        }}
      >
        <i class="far fa-copy" />
      </button>
    </div>
  );
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

/**
 * Parse a string reprenting a list of line numbers, some of which may be
 * ranges. The parsed output is a Set of line numbers that are included in the
 * range.
 *
 * For instance, the string `'13, 24-26, 25-27'` is parsed as
 * `Set([13, 24, 25, 26, 27])`
 *
 * @param rawHighlightRanges A comma-separated string representing ranges
 * @param maxLineNumber The maximum valid line number
 */
export function parseCodeHighlightRanges(
  rawHighlightRanges: string | null,
  maxLineNumber: number,
): Set<number> {
  const highlightedLines = new Set<number>();
  if (!rawHighlightRanges) {
    return highlightedLines;
  }

  const ranges = rawHighlightRanges.split(',');
  ranges.forEach((range) => {
    // First check if it's a single number
    const potentialLineNum = +range;
    if (isNumWithinInclusiveRange(potentialLineNum, 1, maxLineNumber)) {
      highlightedLines.add(potentialLineNum);
    } else {
      const rangeParts = range.trim().split('-');
      if (rangeParts.length === 2) {
        const lower = +rangeParts[0];
        const upper = +rangeParts[1];
        if (
          isNumWithinInclusiveRange(lower, 1, maxLineNumber) &&
          isNumWithinInclusiveRange(upper, 1, maxLineNumber) &&
          lower <= upper
        ) {
          for (let i = lower; i <= upper; ++i) {
            highlightedLines.add(i);
          }
        }
      }
    }
  });
  return highlightedLines;
}

/**
 * Return a boolean indicating whether `num` is in the range [`lower`, `upper`]
 * (inclusive).
 */
function isNumWithinInclusiveRange(
  num: number | null,
  lower: number,
  upper: number,
): boolean {
  return num != null && !Number.isNaN(num) && num >= lower && num <= upper;
}

/**
 * Using the Selection API, select all content between `startLine_` and
 * `endLine_` for the codeblock identified by `codeblockId`.
 */
function selectLines(
  codeblockId: string,
  startLine_: number,
  endLine_: number,
) {
  let startLine = startLine_;
  let endLine = endLine_;
  if (startLine > endLine) {
    // The range is inverted (for example, start selecting from line 4 to
    // line 2).
    startLine = endLine_;
    endLine = startLine_;
  }
  const startNode = document.getElementById(`${codeblockId}-LC${startLine}`);
  const endNode = document.getElementById(`${codeblockId}-LC${endLine}`);
  if (!startNode || !endNode) {
    console.error(
      'Primer Spec Code Block: selectLines: start or end nodes are null. Please report this issue on https://github.com/eecs485staff/primer-spec/issues. Thanks!',
    );
    return;
  }

  const range = document.createRange();
  range.setStart(startNode, 0);
  range.setEnd(endNode, endNode.childNodes.length);
  document.getSelection()?.removeAllRanges();
  document.getSelection()?.addRange(range);
}
