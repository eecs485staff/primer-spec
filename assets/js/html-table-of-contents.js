/*
 * Modified by Sesh Sadasivam on 2/21/2019
 * New features:
 *   - AnchorJS links are used by default
 *   - Ability to ignore certain headings by adding a class
 *   - Minor changes to class-name to indicate that it is separate from the
 *     Jekyll theme.
 */


(function() {
    if (!$) {
        console.warn('html-table-of-contents.js requires JQuery.');
    }
})();


function _nodeContainsAnchorChild(node) {
    return $('a.anchorjs-link', $(node)).length > 0;
}


function _getAnchorLink(headingNode) {
    if (!_nodeContainsAnchorChild(headingNode)) {
        throw {
            "error": "_getAnchorLink expected heading to contain anchor while populating table of contents."
        };
    }
    return $('a.anchorjs-link', $(headingNode)).attr('href');
}


function _createHeadingToc(documentRef, heading, index, outputTocDiv) {
    if (heading.classList.contains('primer-spec-toc-ignore')) {
        return;
    }

    // If a heading already has an anchor from AnchorJS, use that
    var href = '';
    if (_nodeContainsAnchorChild(heading)) {
        href = _getAnchorLink(heading);
    }
    else {
        // Otherwise, create an anchor
        href = '#toc' + index;
        var anchor = documentRef.createElement('a');
        anchor.setAttribute('name', 'toc' + index);
        anchor.setAttribute('id', 'toc' + index);
        heading.parentNode.insertBefore(anchor, heading);
    }
    
    
    var link = documentRef.createElement('a');
    link.setAttribute('href', href);
    link.textContent = heading.textContent;
    
    var div = documentRef.createElement('div');
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
 * @param {HTMLDOMDocument} documentRef - The `document` object.
 * @param {Array<HTMLElement>} headings - A flat-list of heading DOM nodes.
 * @param {number} index - The starting index into `headings`.
 * @param {HTMLElement} outputTocDiv - The element where the heading 
 *      and section indicated by `index` should be placed.
 */
function _generateToCSections(documentRef, headings, index, outputTocDiv) {
    if (index >= headings.length) {
        return index;
    }

    var heading = headings[index];
    _createHeadingToc(documentRef, heading, index, outputTocDiv);
    var sectionDiv = documentRef.createElement('div');
    sectionDiv.setAttribute('class', 'primer-spec-toc-section');

    var i = index + 1;
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
 * @param {HTMLDOMDocument} documentRef Optional A reference to the document
 *  object. Defaults to `document`.
 * @author Sesh Sadasivam
 * @author Matthew Christopher Kastor-Inare III
 * @url https://github.com/matthewkastor/html-table-of-contents
 * @example
 * // call this after the page has loaded
 * htmlTableOfContents();
 */
function htmlTableOfContents(documentRef) {
    var documentRef = documentRef || document;
    var toc = documentRef.getElementById('primer-spec-toc');
    var headings = [].slice.call(documentRef.body.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    var index = 0;
    while (index < headings.length) {
        index = _generateToCSections(documentRef, headings, index, toc);
    }
}
