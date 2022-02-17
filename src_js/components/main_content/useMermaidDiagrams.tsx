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

    const outputDiagram = <div class="primer-spec-mermaid-output" />;
    parent.after(outputDiagram);

    mermaid.mermaidAPI.render(diagramID, content, (diagramHTML: string) => {
      outputDiagram.innerHTML = diagramHTML;
    });
  });

  return () => {};
}
