/** @jsx JSXDom.h */
import { RefObject } from 'preact';
import * as JSXDom from 'jsx-dom';
import clsx from 'clsx';

const GIST_CODE_LINE_CLASS = 'primer-spec-gist-line-code';
// We perform special handling for gists in the `console` language: If a user
// clicks the line number, the entire line will be highlighted EXCLUDING the
// prompt (`$`) at the beginning, if it exists.
// See the special handling in `createGistLine()`.
const LANGUAGE_CONSOLE = 'console';

// We use this to keep track of click-then-drag on line numbers to select
// multiple lines simultaneously.
let mouseDownStartLine: number | null = null;

/**
 * A custom hook that converts code blocks with class `primer-spec-gist`.
 * Gists are a special type of codeblock that show line numbers, and can
 * optionally highlight lines and show a filename.
 * @param mainElRef A ref to the `<main>` element from MainContent
 */
export default function useCodeBlockGists(
  mainElRef: RefObject<HTMLElement>,
): () => void {
  if (!mainElRef.current) {
    throw new Error(
      'Primer Spec: Main Content: Expected main content ref to be initialized.',
    );
  }

  // The original structure of a codeblock:
  // <div
  //   class="primer-spec-gist highlighter-rouge language-[lang]"
  //   data-filename="[filename]"         {/* OPTIONAL */}
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

  const gistsSrc = mainElRef.current.querySelectorAll('div.primer-spec-gist');
  gistsSrc.forEach((gistSrc, i) => {
    const codeEl = gistSrc.firstChild?.firstChild?.firstChild;
    if (codeEl == null) {
      console.warn(
        'useCodeBlockGists: Primer Spec Gist has malformed structure. See Primer Spec Docs for expected structure. (TODO: Link to docs)',
        'gistSrc',
        gistSrc,
      );
      return;
    }

    const gistContents = (codeEl as HTMLElement).innerHTML;
    if (gistContents == null) {
      console.warn(
        'useCodeBlockGists: Unexpectedly empty Primer Spec Gist',
        'gistSrc',
        gistSrc,
      );
      return;
    }

    const lines = gistContents.split('\n');
    if (lines.length === 0) {
      console.warn(
        'useCodeBlockGists: Primer Spec Gist appears to have no lines!',
        'gistSrc',
        gistSrc,
      );
      return;
    }
    const lastLine = lines[lines.length - 1];
    if (lastLine === '' || lastLine === '</span>') {
      lines.pop();
    }

    const gistId = `gist-${i}`;

    const language = getGistLanguage(gistSrc);
    const title = gistSrc.getAttribute('data-filename') ?? language;

    const highlightRanges = parseGistHighlightRanges(
      gistSrc.getAttribute('data-highlight'),
      lines.length,
    );

    const gist = createGist(gistId, lines, title, language, highlightRanges);

    // Clear the old code block and replace with the gist
    gistSrc.textContent = '';
    gistSrc.appendChild(gist);
  });

  return () => {};
}

function createGist(
  gistId: string,
  lines: Array<string>,
  title: string | null,
  language: string | null,
  highlightRanges: Set<number>,
): HTMLElement {
  const gist = (
    <div id={gistId} class="Box mt-3 text-mono">
      <div class="Box-header py-2 pr-2 d-flex flex-shrink-0 flex-md-row flex-items-center primer-spec-gist-header">
        <span class="flex-auto">
          <a href={`#${gistId}`}>{title}</a>
        </span>
        <span class="flex-auto flex-grow-0">
          <button
            type="button"
            class="btn-octicon no-print tooltipped tooltipped-n"
            onClick={async (e) => {
              const gist = document.getElementById(gistId);
              if (gist) {
                // (1) Copy the lines to the clipboard
                const lines = gist.querySelectorAll(`.${GIST_CODE_LINE_CLASS}`);
                const text = [...lines]
                  .map((line) => (line as HTMLElement).innerText)
                  .join('\n');
                await navigator.clipboard.writeText(text);

                // (2) Fetch the copy-button
                let btn = e.target as HTMLElement | null;
                if (btn?.tagName === 'I') {
                  btn = btn.parentElement;
                }
                // (3) Temporarily change the label of the button
                const originalLabel = btn?.getAttribute('aria-label');
                btn?.setAttribute('aria-label', 'Copied!');
                setTimeout(() => {
                  btn?.setAttribute('aria-label', originalLabel || '');
                  btn?.blur();
                }, 2000);
              }
            }}
            aria-label="Copy"
          >
            <i class="far fa-copy" />
          </button>
        </span>
      </div>
      <div class="Box-body p-0 primer-spec-gist-body">
        <table class="highlight">
          {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <tbody
            onMouseOver={(e) => {
              if (mouseDownStartLine != null && e.target != null) {
                const elementId = (e.target as HTMLElement).id;
                const match = elementId.match(/^gist-\d-LC?(\d+)$/);
                if (match && match[1] != null) {
                  selectLines(gistId, mouseDownStartLine, +match[1]);
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
              createGistLine(
                gistId,
                language,
                line,
                lineNumber + 1,
                highlightRanges.has(lineNumber + 1),
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  return gist as HTMLElement;
}

function createGistLine(
  gistId: string,
  language: string | null,
  line: string,
  lineNumber: number,
  shouldHighlight: boolean,
): HTMLElement {
  const L_ID = `${gistId}-L${lineNumber}`;
  const LC_ID = `${gistId}-LC${lineNumber}`;
  const gistLine = (
    <tr>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <td
        id={L_ID}
        class="primer-spec-gist-line-number"
        data-line-number={lineNumber}
        onMouseDown={() => {
          mouseDownStartLine = lineNumber;
          selectLines(gistId, mouseDownStartLine, mouseDownStartLine);
        }}
      />
      <td
        id={LC_ID}
        class={clsx(
          GIST_CODE_LINE_CLASS,
          shouldHighlight && 'primer-spec-gist-highlighted',
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: line }}
      />
    </tr>
  ) as HTMLElement;

  // SPECIAL HANDLING for `console` gists: When a user clicks the line number
  // to select the entire line, attempt to exclude the leading prompt
  // symbol (`$`).
  if (language === LANGUAGE_CONSOLE) {
    const codeLine = gistLine.querySelector(
      `.${GIST_CODE_LINE_CLASS}`,
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

  return gistLine;
}

function getGistLanguage(gistSrc: Element): string | null {
  for (const className of gistSrc.classList) {
    if (className.startsWith('language-')) {
      return className.replace('language-', '');
    }
  }
  return null;
}

/**
 * Parses a string reprenting a list of line numbers, some of which may be
 * ranges. The parsed output is a Set of line numbers that are included in the
 * range.
 *
 * For instance, the string `'13, 24-26, 25-27'` is parsed as
 * `Set([13, 24, 25, 26, 27])`
 *
 * @param rawHighlightRanges A comma-separated string representing ranges
 * @param maxLineNumber The maximum valid line number
 */
export function parseGistHighlightRanges(
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

function isNumWithinInclusiveRange(
  num: number | null,
  lower: number,
  upper: number,
): boolean {
  return num != null && !Number.isNaN(num) && num >= lower && num <= upper;
}

function selectLines(gistId: string, startLineIn: number, endLineIn: number) {
  let startLine = startLineIn;
  let endLine = endLineIn;
  if (startLine > endLine) {
    // The range is inverted (for example, start selecting from line 4 to
    // line 2).
    startLine = endLineIn;
    endLine = startLineIn;
  }
  const startNode = document.getElementById(`${gistId}-LC${startLine}`);
  const endNode = document.getElementById(`${gistId}-LC${endLine}`);
  if (!startNode || !endNode) {
    console.error(
      'Primer Spec Gist: selectLines: start or end nodes are null. Please report this issue on https://github.com/eecs485staff/primer-spec/issues. Thanks!',
    );
    return;
  }

  const range = document.createRange();
  range.setStart(startNode, 0);
  range.setEnd(endNode, endNode.childNodes.length);
  document.getSelection()?.removeAllRanges();
  document.getSelection()?.addRange(range);
}
