import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
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

export default function TableOfContents(props: PropsType): h.JSX.Element {
  // We don't actually care about the window.scrollY state, we can get that
  // from the window object on demand. We use a state-setter so that we can
  // re-render the component.
  const [_, setWindowScrollDistance] = useState(window.scrollY || 0);

  // When the user scrolls, rerender the component.
  useEffect(() => {
    // Throttle scroll events using rAF.
    // Based on: https://css-tricks.com/debouncing-throttling-explained-examples/
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setWindowScrollDistance(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const tocNodes = generateTocNodesForContentNode(
    props.contentNodeSelector,
    props.activeSectionOffsetY,
  );

  return (
    <nav class="primer-spec-toc">
      <div
        role="presentation"
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
      </div>
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
  const headingLabel = getHeadingLabel(heading);
  return (
    <li>
      <div
        class={`primer-spec-toc-item primer-spec-toc-${heading.tagName.toLowerCase()} ${
          section.active ? 'primer-spec-toc-active' : ''
        }`}
      >
        <a href={getAnchorLink(heading)}>{headingLabel}</a>
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

// We memoize the heading label since it's not expected to change
// for the lifetime of the page.
const headingLabelMemo: { [id: string]: h.JSX.Element } = {};
/**
 * Generate a label for use in the ToC Sidebar that represents the given
 * `headingNode`.
 *
 * Ordinarily, `headingNode.innerText` would have been sufficient, but this
 * function preserves inline code-blocks in headings.
 *
 * @param headingNode The heading node for which we need to generate a label
 */
function getHeadingLabel(headingNode: HTMLElement): h.JSX.Element {
  if (headingNode.id && headingLabelMemo[headingNode.id]) {
    return headingLabelMemo[headingNode.id];
  }

  let headingLabel: h.JSX.Element | null = null;
  try {
    const labelComponents: h.JSX.Element[] = [];
    headingNode.childNodes.forEach((childNode) => {
      switch (childNode.nodeType) {
        case Node.TEXT_NODE:
          labelComponents.push(<Fragment>{childNode.nodeValue}</Fragment>);
          break;

        case Node.ELEMENT_NODE:
          if (!(childNode instanceof HTMLElement)) {
            throw new Error('getHeadingLabel expected HTML Element');
          }
          if (childNode.tagName === 'CODE' || childNode.tagName === 'TT') {
            labelComponents.push(
              <code class={[...childNode.classList].join(' ')}>
                {childNode.innerText}
              </code>,
            );
          }
          break;
      }
    });
    headingLabel = <Fragment>{labelComponents}</Fragment>;
  } catch (e) {
    console.error(
      'Primer Spec ToC: Errored while building heading label for heading',
      headingNode,
    );
    headingLabel = <Fragment>{headingNode.innerText}</Fragment>;
  }

  if (headingNode.id) {
    headingLabelMemo[headingNode.id] = headingLabel;
  }
  return headingLabel;
}
