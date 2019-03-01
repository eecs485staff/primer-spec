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


/**
 * Generates a table of contents for your document based on the headings
 *  present. Anchors are injected into the document and the
 *  entries in the table of contents are linked to them. The table of
 *  contents will be generated inside of the first element with the id `toc`.
 * @param {HTMLDOMDocument} documentRef Optional A reference to the document
 *  object. Defaults to `document`.
 * @author Matthew Christopher Kastor-Inare III
 * @version 20130726
 * @url https://github.com/matthewkastor/html-table-of-contents
 * @example
 * // call this after the page has loaded
 * htmlTableOfContents();
 */
function htmlTableOfContents(documentRef) {
    var documentRef = documentRef || document;
    var toc = documentRef.getElementById('primer-spec-toc');
    var headings = [].slice.call(documentRef.body.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    headings.forEach(function (heading, index) {
        // Ignore headings that should not be part of the ToC
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
        toc.appendChild(div);
    });
}
