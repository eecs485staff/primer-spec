/** @jsx JSXDom.h */
import { RefObject } from 'preact';
import * as JSXDom from 'jsx-dom';

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
  mermaid.mermaidAPI.initialize({
    securityLevel: 'loose',
    startOnLoad: false,
    theme: isDarkModeEnabled ? 'dark' : 'default',
  });

  // Remove any existing mermaid diagrams
  mainElRef.current
    .querySelectorAll('.primer-spec-mermaid-output')
    .forEach((oldDiagram) => oldDiagram.remove());

  const mermaidBlocks = mainElRef.current.querySelectorAll(
    'pre > code.language-mermaid',
  );
  mermaidBlocks.forEach((mermaidBlock, i) => {
    const diagramID = `diagram-${i}`;
    const content = (mermaidBlock as HTMLElement).innerText;
    const parent = mermaidBlock.parentElement as HTMLElement | null;
    if (parent == null) {
      return;
    }

    parent.style.display = 'none';

    const outputDiagram = (
      <div
        class="primer-spec-mermaid-output"
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

  return () => {};
}
