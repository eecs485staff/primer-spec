/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { parseCodeHighlightRanges } from './parseCodeHighlightRanges';
import clsx from 'clsx';
import {
  CODEBLOCK_TITLE_CLASS,
  LANGUAGE_CONSOLE,
  CODEBLOCK_LINE_CLASS,
} from './codeblockConsts';
import { genCopyButton } from './genCopyButton';

// We use this to keep track of click-then-drag on line numbers to select
// multiple lines simultaneously.
let mouseDownStartLine: number | null = null;

/**
 * Given a list of configuration options, return an enhanced code block
 * `HTMLElement`. This method is _not_ responsible for actually inserting the
 * `HTMLElement` into the DOM.
 */
export function createEnhancedCodeBlock(options: {
  codeblockNumericId: number;
  rawContent: string;
  language: string | null;
  rawHighlightRanges: string | null;
  title?: string | null;
  anchorId?: string | null;
  showLineNumbers: boolean;
}): HTMLElement | null {
  const {
    codeblockNumericId,
    rawContent,
    language,
    rawHighlightRanges,
    title,
    anchorId,
    showLineNumbers,
  } = options;

  const lines = rawContent.split('\n');
  if (lines.length === 0) {
    console.warn('useEnhancedCodeBlocks: Code Block appears to have no lines!');
    return null;
  }
  const lastLine = lines[lines.length - 1];
  if (lastLine === '' || lastLine === '</span>') {
    lines.pop();
  }

  const {
    linesWithoutMagicComments,
    removedLineNumbers,
    additionalHighlightRanges,
  } = parseMagicComments(lines);

  const highlightRanges = parseCodeHighlightRanges(
    [rawHighlightRanges, additionalHighlightRanges].filter(Boolean).join(','),
    lines.length,
    removedLineNumbers,
  );

  const codeblockId = `primer-spec-code-block-${codeblockNumericId}`;

  const header = genCodeBlockHeader(title, anchorId);
  const enhancedCodeBlock = (
    <div id={codeblockId} class="Box mt-3 text-mono">
      {header}
      <div
        class={clsx(
          'Box-body',
          'p-0',
          'primer-spec-code-block-body',
          header && 'primer-spec-code-block-header-present',
        )}
      >
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
            {linesWithoutMagicComments.map((line, lineNumber) =>
              createCodeBlockLine({
                codeblockId,
                language,
                line,
                lineNumber: lineNumber + 1,
                shouldHighlight: highlightRanges.has(lineNumber + 1),
                showLineNumbers,
              }),
            )}
          </tbody>
        </table>
        {linesWithoutMagicComments.length > 1
          ? genCopyButton(codeblockId, language === LANGUAGE_CONSOLE)
          : null}
      </div>
    </div>
  );
  return enhancedCodeBlock as HTMLElement;
}

function createCodeBlockLine(options: {
  codeblockId: string;
  language: string | null;
  line: string;
  lineNumber: number;
  shouldHighlight: boolean;
  showLineNumbers: boolean;
}): HTMLElement {
  const {
    codeblockId,
    language,
    line: line_,
    lineNumber,
    shouldHighlight,
    showLineNumbers,
  } = options;

  // Insert a '\n' character in empty lines to make them selectable.
  const line = line_ === '' ? '\n' : line_;

  const L_ID = `${codeblockId}-L${lineNumber}`;
  const LC_ID = `${codeblockId}-LC${lineNumber}`;
  const LR_ID = `${codeblockId}-LR${lineNumber}`;
  const codeblockLine = (
    <tr id={LR_ID}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <td
        id={L_ID}
        class={clsx(
          'primer-spec-code-block-line-number',
          showLineNumbers && 'primer-spec-code-block-line-numbers-shown',
        )}
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

function genCodeBlockHeader(title?: string | null, anchorId?: string | null) {
  if (title == null) {
    return null;
  }
  return (
    <div class="Box-header py-2 pr-2 d-flex flex-shrink-0 flex-md-row flex-items-center primer-spec-code-block-header">
      <span
        class={clsx('flex-auto', CODEBLOCK_TITLE_CLASS)}
        data-anchor-id={anchorId}
      >
        {title}
      </span>
    </div>
  );
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

const MAGIC_COMMENT_REGEX = /^\s*<span class="c[mp1sd]?">.*primer-spec-highlight-(start|end)/i;
function parseMagicComments(
  lines: Array<string>,
): {
  linesWithoutMagicComments: Array<string>;
  removedLineNumbers: Array<number>;
  additionalHighlightRanges: string;
} {
  let highlightStart = null;
  const linesWithoutMagicComments: Array<string> = [];
  const removedLineNumbers: Array<number> = [];
  const additionalHighglightRangesList: Array<string> = [];

  for (let i = 0; i < lines.length; ++i) {
    const humanReadableLineNumber = i + 1;
    const match = lines[i].match(MAGIC_COMMENT_REGEX);
    if (match != null) {
      if (highlightStart == null && match[1] === 'start') {
        highlightStart = humanReadableLineNumber;
        removedLineNumbers.push(humanReadableLineNumber);
      } else if (highlightStart != null && match[1] === 'end') {
        additionalHighglightRangesList.push(
          `${highlightStart}-${humanReadableLineNumber}`,
        );
        highlightStart = null;
        removedLineNumbers.push(humanReadableLineNumber);
      } else {
        // Bad usage of a magic comment, so include it in the final code block
        // anyway (so users aren't confused why the code block isn't
        // highlighted).
        linesWithoutMagicComments.push(lines[i]);
      }
    } else {
      linesWithoutMagicComments.push(lines[i]);
    }
  }

  return {
    linesWithoutMagicComments,
    removedLineNumbers,
    additionalHighlightRanges: additionalHighglightRangesList.join(','),
  };
}
