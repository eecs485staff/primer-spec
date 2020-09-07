import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import unflattenHeadings, { HeadingsSectionType } from './unflattenHeadings';

export type PropsType = {
  contentNodeSelector: string;
  isSmallScreen: boolean;
  sidebarShown: boolean;
  settingsShown: boolean;
  activeSectionOffsetY: number;
  onToggleSidebar: () => void;
  onToggleSettings: () => void;
};

export default function TableOfContents(props: PropsType) {
  // We don't actually care about the window.scrollY state, we can get that
  // from the window object on demand. We use a state-setter so that we can
  // re-render the component.
  const [_, setWindowScrollDistance] = useState(window.scrollY || 0);

  // When the user scrolls, rerender the component.
  useEffect(() => {
    const scrollHandler = () => setWindowScrollDistance(window.scrollY);
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const tocNodes = generateTocNodesForContentNode(
    props.contentNodeSelector,
    props.activeSectionOffsetY,
  );

  return (
    <nav
      id="primer-spec-toc"
      onClick={() => {
        // When a TOC item is clicked, close the Settings. Also close the Sidebar on
        // small screens.
        if (props.isSmallScreen && props.sidebarShown) {
          props.onToggleSidebar();
        }
        if (props.settingsShown) {
          props.onToggleSettings();
        }
      }}
    >
      {tocNodes}
    </nav>
  );
}

function generateTocNodesForContentNode(
  contentNodeSelector: string,
  threshold: number,
) {
  const contentNode = document.body.querySelector(contentNodeSelector);
  if (!contentNode) {
    throw new Error(
      `Primer Spec: TableOfContents: Main content node could not be found with selector: ${contentNodeSelector}`,
    );
  }

  const headings = [
    ...contentNode.querySelectorAll('h1, h2, h3, h4, h5, h6'),
  ].filter((heading) => !heading.classList.contains('primer-spec-toc-ignore'));

  // Initialize activeHeadingIndex to the last index. If there are no active
  // headings below the threshold, we should be highlighting this section.
  let activeHeadingIndex = headings.length - 1;
  for (let i = 0; i < headings.length; ++i) {
    const heading = headings[i];
    if (heading.getBoundingClientRect().top - threshold > 0) {
      activeHeadingIndex = i - 1;
      break;
    }
  }

  return generateTocNodes(headings, activeHeadingIndex);
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
 * @param activeHeadingIndex The index of the active heading item. Use -1 to deactivate.
 */
function generateTocNodes(headings: Element[], activeHeadingIndex: number) {
  const unflattened = unflattenHeadings(headings, activeHeadingIndex);
  return (
    <ul class="primer-spec-toc-list">
      {unflattened.map((section) => generateTocNodesHelper(section))}
    </ul>
  );
}

function generateTocNodesHelper(section: HeadingsSectionType) {
  const heading = section.heading as HTMLElement;
  return (
    <li>
      <div
        class={`primer-spec-toc-item primer-spec-toc-${heading.tagName.toLowerCase()} ${
          section.active ? 'primer-spec-toc-active' : ''
        }`}
      >
        <a href={getAnchorLink(heading)}>{heading.textContent}</a>
      </div>
      <ul class="primer-spec-toc-section primer-spec-toc-list">
        {section.section.map((_section) => generateTocNodesHelper(_section))}
      </ul>
    </li>
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
