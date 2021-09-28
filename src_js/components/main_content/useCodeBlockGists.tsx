/** @jsx JSXDom.h */
import { RefObject } from 'preact';
import * as JSXDom from 'jsx-dom';
import clsx from 'clsx';

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
  gistsSrc.forEach((gistSrc) => {
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

    let title = gistSrc.getAttribute('data-filename');
    if (!title) {
      // Attempt to use the gist's source language
      title = getGistLanguage(gistSrc);
    }

    const highlightRanges = parseGistHighlightRanges(
      gistSrc.getAttribute('data-highlight'),
      lines.length,
    );

    const gist = createGist(lines, title, highlightRanges);

    // Clear the old code block and replace with the gist
    gistSrc.textContent = '';
    gistSrc.appendChild(gist);
  });

  return () => {};
}

function createGist(
  lines: Array<string>,
  title: string | null,
  highlightRanges: Set<number>,
): HTMLElement {
  const gist = (
    <div class="Box mt-3 text-mono">
      <div class="Box-header py-2 pr-2 d-flex flex-shrink-0 flex-md-row flex-items-center primer-spec-gist-header">
        {title}
      </div>
      <div class="Box-body p-0 primer-spec-gist-body">
        <table class="highlight">
          <tbody>
            {lines.map((line, lineNumber) =>
              createGistLine(
                line,
                lineNumber + 1,
                highlightRanges.has(lineNumber),
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
  line: string,
  lineNumber: number,
  shouldHighlight: boolean,
): HTMLElement {
  const gistLine = (
    <tr>
      <td
        id={`L${lineNumber}`}
        class="primer-spec-gist-line-number"
        data-line-number={lineNumber}
      />
      <td
        id={`LC${lineNumber}`}
        class={clsx(
          'primer-spec-gist-line-code',
          shouldHighlight && 'primer-spec-gist-highlighted',
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: line }}
      />
    </tr>
  );
  return gistLine as HTMLElement;
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
