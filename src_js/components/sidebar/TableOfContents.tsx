import { h, Fragment } from 'preact';
import unflattenHeadings, { HeadingsSectionType } from './unflattenHeadings';

export type PropsType = {
  contentNodeSelector: string;
};

// To prevent regenerating the TOC nodes every time <TableOfContents /> is
// rendered, we use a memo to cache the results. Note that in general, we
// expect to only ever receive one value of contentNodeSelector.
// The same behavior could have been achieved with React.memo, but Preact does
// not implement something similar out of the box.
const memo: { [contentNodeSelector: string]: h.JSX.Element } = {};

export default function TableOfContents({ contentNodeSelector }: PropsType) {
  const contentNode = document.body.querySelector(contentNodeSelector);
  if (!contentNode) {
    throw new Error(
      `Primer Spec: TableOfContents: Main content node could not be found with selector: ${contentNodeSelector}`,
    );
  }

  if (!memo[contentNodeSelector]) {
    const headings = [
      ...contentNode.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    ];
    const tocNodes = generateTocNodes(headings);
    memo[contentNodeSelector] = <div id="primer-spec-toc">{tocNodes}</div>;
  }

  return memo[contentNodeSelector];
}

/**
 * Generate a list of JSX elements forming a Table of Contents.
 *
 * Previous versions of Primer Spec used a custom fork of
 * htmlTableOfContents.js by Matthew Christopher Kastor-Inare III
 * (https://github.com/matthewkastor/html-table-of-contents).
 * The current implementation bears very little resemblance to the original
 * algorithm besides the structure of the final HTML output.
 *
 * @param headings List of HTML nodes representing header elements in the page
 */
function generateTocNodes(headings: Element[]) {
  const unflattened = unflattenHeadings(headings);
  return unflattened.map((section) => generateTocNodesHelper(section));
}

function generateTocNodesHelper(section: HeadingsSectionType) {
  const heading = section.heading as HTMLElement;
  return (
    <Fragment>
      <div
        class={`primer-spec-toc-item primer-spec-toc-${heading.tagName.toLowerCase()}`}
      >
        <a href={getAnchorLink(heading)}>{heading.textContent}</a>
      </div>
      <div class="primer-spec-toc-section">
        {section.section.map((_section) => generateTocNodesHelper(_section))}
      </div>
    </Fragment>
  );
}

function getAnchorLink(headingNode: HTMLElement) {
  const anchorNode = headingNode.querySelector('a.anchorjs-link');
  if (!anchorNode) {
    console.error(
      'Primer Spec: getAnchorLink expected heading to contain anchor while populating table of contents.',
    );
    return '#';
  }

  return anchorNode.getAttribute('href') || '#';
}
