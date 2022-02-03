import { RefObject } from 'preact';

/**
 * A custom hook that transforms elements of the form:
 * ```html
 *   <abbr title="...">...</abbr>
 * ```
 * with modified attributes that show a dynamic mobile-friendly tooltip.
 * @param mainElRef A ref to the `<main>` element from MainContent
 */
export default function useTooltippedAbbreviations(
  mainElRef: RefObject<HTMLElement>,
): () => void {
  if (!mainElRef.current) {
    throw new Error(
      'Primer Spec: Main Content: Expected main content ref to be initialized.',
    );
  }

  // The structure of a kramdown abbreviation is:
  // <abbr title="...">...</abbr>

  // Wrap the entire contents of each <li> in a <label> for better a11y
  const abbreviations = mainElRef.current.querySelectorAll(
    'abbr[title]',
  ) as NodeListOf<HTMLElement>;
  abbreviations.forEach((abbreviation) => {
    abbreviation.classList.add(
      'tooltipped',
      'tooltipped-no-delay',
      'tooltipped-n',
    );
    abbreviation.setAttribute('aria-label', abbreviation.title);
    abbreviation.removeAttribute('title');
  });

  return () => {};
}
