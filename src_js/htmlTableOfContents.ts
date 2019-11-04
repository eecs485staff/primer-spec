/**
 * htmlTableOfContents.js
 *
 * Forked from htmlTableOfContents.js by Matthew Christopher Kastor-Inare III
 * (https://github.com/matthewkastor/html-table-of-contents)
 *
 * Modifications:
 *   - Added compatibility with ES6-style imports and TypeScript.
 *   - AnchorJS links are used by default
 *   - Ability to ignore certain headings by adding a class
 *   - Minor changes to class-name to indicate that it is separate from the
 *     Jekyll theme.
 */

function _nodeContainsAnchorChild(node: HTMLElement) {
  return $('a.anchorjs-link', $(node)).length > 0;
}

function _getAnchorLink(headingNode: HTMLElement) {
  if (!_nodeContainsAnchorChild(headingNode)) {
    throw {
      error: '_getAnchorLink expected heading to contain anchor while populating table of contents.',
    };
  }
  return $('a.anchorjs-link', $(headingNode)).attr('href') || '';
}

function _createHeadingToc(
  documentRef: Document,
  heading: HTMLElement,
  index: number,
  outputTocDiv: HTMLElement
) {
  if (heading.classList.contains('primer-spec-toc-ignore')) {
    return;
  }

  // If a heading already has an anchor from AnchorJS, use that
  let href: string;
  if (_nodeContainsAnchorChild(heading)) {
    href = _getAnchorLink(heading);
  }
 else {
    // Otherwise, create an anchor
    href = '#toc' + index;
    const anchor = documentRef.createElement('a');
    anchor.setAttribute('name', 'toc' + index);
    anchor.setAttribute('id', 'toc' + index);
    heading.parentNode!.insertBefore(anchor, heading);
  }

  const link = documentRef.createElement('a');
  link.setAttribute('href', href);
  link.textContent = heading.textContent;

  const div = documentRef.createElement('div');
  div.setAttribute('class', 'primer-spec-toc-item primer-spec-toc-' + heading.tagName.toLowerCase());

  div.appendChild(link);
  outputTocDiv.appendChild(div);
}

/**
 * Generate a ToC heading and a single "section" given a list of `headings` DOM
 *   elements starting from index `index`. The new ToC elements are placed
 *   in `outputTocDiv`.
 *
 * A "section" is defined to contain all subsequent headings with a tag-number
 * larger than that of `headings[index]`. For instance, if
 * `headings` contains a list of `[h1, h2, h2, h1, h3]`, the `h2` headings
 * are included in the first `h1` section, and the `h3` heading is included in
 * the second `h1` section. Note that all headings have their own sections,
 * however their sections may be empty. (In this example, the non-`h1` headings
 * all have empty sections.)
 * As a result, this function operates in a recursive manner.
 * @param {Document} documentRef - The `document` object.
 * @param {HTMLElement[]} headings - A flat-list of heading DOM nodes.
 * @param {number} index - The starting index into `headings`.
 * @param {HTMLElement} outputTocDiv - The element where the heading
 *      and section indicated by `index` should be placed.
 */
function _generateToCSections(
  documentRef: Document,
  headings: HTMLElement[],
  index: number,
  outputTocDiv: HTMLElement,
) {
  if (index >= headings.length) {
    return index;
  }

  const heading = headings[index];
  _createHeadingToc(documentRef, heading, index, outputTocDiv);
  const sectionDiv = documentRef.createElement('div');
  sectionDiv.setAttribute('class', 'primer-spec-toc-section');

  let i = index + 1;
  while (i < headings.length) {
    if (headings[i].tagName[1] <= heading.tagName[1]) {
      break;
    }
 else {
      i = _generateToCSections(documentRef, headings, i, sectionDiv);
    }
  }
  outputTocDiv.appendChild(sectionDiv);
  return i;
}

/**
 * Generates a table of contents for your document based on the headings
 *  present. Anchors are injected into the document and the
 *  entries in the table of contents are linked to them. The table of
 *  contents will be generated inside of the first element with the id `toc`.
 * @param {Document} documentRef Optional A reference to the document
 *  object. Defaults to `document`.
 * @author Sesh Sadasivam
 * @author Matthew Christopher Kastor-Inare III
 * @url https://github.com/matthewkastor/html-table-of-contents
 * @example
 * // call this after the page has loaded
 * htmlTableOfContents();
 */
export default function htmlTableOfContents(documentRef_in?: Document) {
  const documentRef = documentRef_in || document;
  const toc = documentRef.getElementById('primer-spec-toc')!;
  const headings: HTMLElement[] = [].slice.call(documentRef.body.querySelectorAll('h1, h2, h3, h4, h5, h6'));

  let index = 0;
  while (index < headings.length) {
    index = _generateToCSections(documentRef, headings, index, toc);
  }
}
