/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { CODEBLOCK_LINE_CLASS } from './codeblockConsts';

export function genCopyButton(codeblockId: string, isConsoleBlock?: boolean) {
  return (
    <div class="primer-spec-zeroclipboard-container position-absolute top-0 right-0">
      <button
        type="button"
        class="btn-octicon no-print m-2 p-2 tooltipped tooltipped-no-delay tooltipped-n"
        tabIndex={0}
        aria-label={isConsoleBlock ? 'Copy all commands' : 'Copy'}
        onClick={async (e) => {
          const codeblock = document.getElementById(codeblockId);
          if (codeblock) {
            // (1) Copy the lines to the clipboard
            await copyLines(
              codeblock,
              isConsoleBlock
                ? CONSOLE_COPY_LINES_MAP_FN
                : DEFAULT_COPY_LINES_MAP_FN,
            );

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

// If a line's only text is \n, set it to the empty string to prevent newlines
// from being duplicated. textContent returns text from all descendant nodes.
const DEFAULT_COPY_LINES_MAP_FN = (line: HTMLElement) =>
  line.textContent !== '\n' ? line.textContent : '';
const CONSOLE_COPY_LINES_MAP_FN = (line: HTMLElement) => {
  // (1) Skip console output lines
  // (Class name 'go' refers to the Rouge class `Generic::Output`.)
  const outputText = line.querySelector('.go');
  if (outputText) {
    return null;
  }
  // (2) If there's a console prompt, skip it
  const shadowLine = line.cloneNode(true) as HTMLElement;
  let prompt: Element | null = null;
  while ((prompt = shadowLine.querySelector('span.gp'))) {
    // (2.1) If there is a space after the prompt, remove it
    //       (to dedent the command)
    if (prompt.nextElementSibling?.classList.contains('w')) {
      const whitespaceEl = prompt.nextElementSibling;
      whitespaceEl.textContent =
        whitespaceEl.textContent?.replace(' ', '') ?? null;
    }
    prompt.remove();
  }
  return shadowLine.innerText;
};

/**
 * Copy the text of a codeblock into the clipboard. Optionally accepts a custom
 * map/filter method to extract text from each line.
 *
 * @param codeblock The codeblock whose lines need to be copied
 * @param mapFn (OPTIONAL) A method that extracts text from a given line
 *              HTMLElement. If the method returns `null`, the line is
 *              *omitted* (and a newline will not be copied).
 */
async function copyLines(
  codeblock: HTMLElement,
  mapFn: (
    line: HTMLElement,
  ) => string | null | void = DEFAULT_COPY_LINES_MAP_FN,
) {
  const lines = codeblock.querySelectorAll(
    `.${CODEBLOCK_LINE_CLASS}`,
  ) as NodeListOf<HTMLElement>;
  const linesOfText = [...lines]
    .map((line) => mapFn(line))
    .filter((lineText) => lineText != null);
  const text = `${linesOfText.join('\n')}\n`;
  await navigator.clipboard.writeText(text);
}
