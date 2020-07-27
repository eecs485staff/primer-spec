import { h, Fragment } from 'preact';
import unflattenHeadings, { HeadingsSectionType } from './unflattenHeadings';

export type PropsType = {
  contentNode: HTMLElement;
};

export default function TableOfContents(props: PropsType) {
  const headings = [
    ...props.contentNode.querySelectorAll('h1, h2, h3, h4, h5, h6'),
  ];
  const tocNodes = generateTocNodes(headings);
  return <div id="primer-spec-toc">{tocNodes}</div>;
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
