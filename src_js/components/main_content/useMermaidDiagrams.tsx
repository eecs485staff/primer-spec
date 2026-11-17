/** @jsx JSXDom.h */
import { RefObject } from 'preact';
import * as JSXDom from 'jsx-dom';
import { clsx } from 'clsx';

/**
 * A custom hook that renders "mermaid code blocks" into actual mermaid
 * diagrams.
 * @param mainElRef A ref to the `<main>` element from MainContent
 */
export default function useMermaidDiagrams(
  mainElRef: RefObject<HTMLElement>,
  isDarkModeEnabled: boolean,
): () => void {
  if (!mainElRef.current) {
    throw new Error(
      'Primer Spec: Main Content: Expected main content ref to be initialized.',
    );
  }

  if (!('mermaid' in window)) {
    return () => {};
  }
  // Remove any existing mermaid diagrams
  mainElRef.current
    .querySelectorAll('.primer-spec-mermaid-output')
    .forEach((oldDiagram) => oldDiagram.remove());

  const mermaidBlocks = mainElRef.current.querySelectorAll(
    'pre > code.language-mermaid',
  );
  mermaidBlocks.forEach((mermaidBlock, i) => {
    const content = (mermaidBlock as HTMLElement).innerText;
    const parent = mermaidBlock.parentElement as HTMLElement | null;
    if (parent == null) {
      return;
    }

    parent.style.display = 'none';

    // Prepare print colors while screen layout and font measurements are valid.
    // Light-mode pages can reuse their single diagram for both screen and print.
    const variants = isDarkModeEnabled ? ['print', 'screen'] : ['screen'];
    variants.forEach((variant) => {
      const diagramID = `diagram-${i}${variant === 'print' ? '-print' : ''}`;
      mermaid.mermaidAPI.initialize({
        securityLevel: 'loose',
        startOnLoad: false,
        theme: variant === 'screen' && isDarkModeEnabled ? 'dark' : 'default',
      });
      const outputDiagram = (
        <div
          class={clsx('primer-spec-mermaid-output', {
            'primer-spec-mermaid-print':
              isDarkModeEnabled && variant === 'print',
            'primer-spec-mermaid-screen':
              isDarkModeEnabled && variant === 'screen',
          })}
          aria-label="Mermaid-enhanced diagram"
        />
      );
      parent.after(outputDiagram);

      mermaid.mermaidAPI.render(diagramID, content, (diagramHTML: string) => {
        outputDiagram.innerHTML = diagramHTML;

        const svgEl = outputDiagram.querySelector('svg');
        if (svgEl == null) {
          console.warn(
            "Primer Spec: Mermaid diagram didn't have an SVG. Please report this issue at github.com/eeccs485staff/primer-spec/issues. Thanks!",
          );
          return;
        }
        // Make diagrams a bit more accessible to screen readers.
        // Based on pattern 11 from: https://www.deque.com/blog/creating-accessible-svgs/
        svgEl.setAttribute('role', 'img');
        // (1) If the spec author added a title, make it available.
        if (parent.dataset['title']) {
          svgEl.insertBefore(
            <title id={`${diagramID}-title`}>{parent.dataset['title']}</title>,
            svgEl.firstChild,
          );
        }
        // (2) If the spec author added a description, make it available.
        //     Otherwise, use the diagram source code. (It isn't great, but it's
        //     better than nothing.)
        let description = parent.dataset['description'];
        if (!description) {
          description = content;
        }
        svgEl.insertBefore(
          <desc id={`${diagramID}-desc`}>{description}</desc>,
          svgEl.firstChild,
        );
        svgEl.setAttribute(
          'aria-labelledby',
          `${diagramID}-title ${diagramID}-desc`,
        );
      });
    });
  });

  return () => {};
}
