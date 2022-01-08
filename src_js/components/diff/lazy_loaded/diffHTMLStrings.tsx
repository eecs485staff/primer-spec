/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { diffTextByWords } from './diffTextByWords';

/**
 * Creates a new HTML DOM element that contains a diff-representation of the
 * old and new HTML raw strings.
 *
 * The resulting diff DOM is wrapped in a `<body>` element, with individual
 * changes wrapped in `span.primer-spec-diff` elements.
 * Removals are wrapped in `<del>` elements, and additions in `<ins>` elements.
 * Text removals and addtions also have the `primer-spec-diff-text` class.
 *
 * For instance:
 * ```html
 * <body>
 *   <p>This content is shared between old and new HTML.</p>
 *   <span class="primer-spec-diff">
 *     <del>
 *       <p>This text was removed.</p>
 *     </del>
 *     <ins>
 *       <h1>This heading was added.</h1>
 *     </ins>
 *   </span>
 *   <p>
 *     <span>
 *       This text is
 *       <span class="primer-spec-diff">
 *         <del class="primer-spec-diff-text">removed</del>
 *         <ins class="primer-spec-diff-text">added</ins>
 *       </span>.
 *     </span>
 *   </p>
 * </body>
 * ```
 */
export function diffHTMLStrings(
  oldHTMLRaw: string,
  newHTMLRaw: string,
): HTMLBodyElement {
  const parser = new DOMParser();
  const oldHTMLBody = parser.parseFromString(oldHTMLRaw, 'text/html').body;
  const newHTMLBody = parser.parseFromString(newHTMLRaw, 'text/html').body;
  if (
    oldHTMLBody.nodeType !== Node.ELEMENT_NODE ||
    newHTMLBody.nodeType !== Node.ELEMENT_NODE
  ) {
    throw new Error(
      'diffHTMLStrings: oldHTMLBody and newHTMLBody must be elements',
    );
  }
  return diffNodes(oldHTMLBody, newHTMLBody) as HTMLBodyElement;
}

function diffNodes(oldNode: Node, newNode: Node): Node {
  if (oldNode.isEqualNode(newNode)) {
    return oldNode;
  } else if (oldNode.nodeType !== newNode.nodeType) {
    return genChangedNodes(oldNode, newNode);
  } else if (oldNode.nodeType === Node.TEXT_NODE) {
    return genChangedTextNodes(oldNode as Text, newNode as Text);
  } else if (oldNode.nodeType === Node.ELEMENT_NODE) {
    return diffElementNodes(oldNode as Element, newNode as Element);
  }

  console.error(
    'Primer Spec: diffHTMLString:diffNodes: Nodes have unexpected type',
    oldNode.nodeType,
  );
  return <span />;
}

function diffElementNodes(oldNode: Element, newNode: Element): Node {
  // It's possible that the nodes are *actually* equal, but the attributes are
  // different. However, we will not treat this case differently.

  if (oldNode.tagName !== newNode.tagName) {
    return genChangedNodes(oldNode, newNode);
  }

  // Since the tagnames are the same, one or more children differ.
  const resultNode = document.createElement(oldNode.tagName);

  const oldNodeChildren = [...oldNode.childNodes];
  const newNodeChildren = [...newNode.childNodes];

  let oldNodeChildIndex = 0;
  let newNodeChildIndex = 0;

  while (
    oldNodeChildIndex < oldNodeChildren.length &&
    newNodeChildIndex < newNodeChildren.length
  ) {
    const oldNodeChild = oldNodeChildren[oldNodeChildIndex];
    const newNodeChild = newNodeChildren[newNodeChildIndex];
    if (oldNodeChild.isEqualNode(newNodeChild)) {
      resultNode.appendChild(oldNodeChild);
      oldNodeChildIndex++;
      newNodeChildIndex++;
    } else {
      // Maybe the old node will be found later in the new document. Let's try
      // to find a match.
      const oldChildIndexInNewChildren = newNodeChildren.findIndex(
        (newNodeChild_, i) =>
          i > newNodeChildIndex && newNodeChild_.isEqualNode(oldNodeChild),
      );
      if (oldChildIndexInNewChildren === -1) {
        // This means that the current newNodeChild is not "inserted".
        // Let's check if this oldNodeChild is "removed", or if it's "changed".
        const newChildIndexInOldChildren = oldNodeChildren.findIndex(
          (oldNodeChild_, i) =>
            i > oldNodeChildIndex && oldNodeChild_.isEqualNode(newNodeChild),
        );
        if (newChildIndexInOldChildren === -1) {
          // The node was just changed.
          resultNode.appendChild(diffNodes(oldNodeChild, newNodeChild));
          oldNodeChildIndex++;
          newNodeChildIndex++;
        } else {
          // The old node was removed.
          while (oldNodeChildIndex < newChildIndexInOldChildren) {
            resultNode.appendChild(
              genDeletion(oldNodeChildren[oldNodeChildIndex]),
            );
            oldNodeChildIndex++;
          }
        }
      } else {
        while (newNodeChildIndex < oldChildIndexInNewChildren) {
          resultNode.appendChild(
            genInsertion(newNodeChildren[newNodeChildIndex]),
          );
          newNodeChildIndex++;
        }
      }
    }
  }
  // Append anything left behind from either document.
  while (oldNodeChildIndex < oldNodeChildren.length) {
    resultNode.appendChild(genDeletion(oldNodeChildren[oldNodeChildIndex]));
    oldNodeChildIndex++;
  }
  while (newNodeChildIndex < newNodeChildren.length) {
    resultNode.appendChild(genInsertion(newNodeChildren[newNodeChildIndex]));
    newNodeChildIndex++;
  }

  return resultNode;
}

/**
 * Assumes that oldNode and newNode are unequal.
 */
function genChangedNodes(oldNode: Node, newNode: Node): Node {
  if (
    oldNode.nodeType === newNode.nodeType &&
    oldNode.nodeType === Node.TEXT_NODE
  ) {
    return genChangedTextNodes(oldNode as Text, newNode as Text);
  }
  return (
    <span className="primer-spec-diff">
      <del>{oldNode}</del>
      <ins>{newNode}</ins>
    </span>
  );
}

function genDeletion(node: Node): Node {
  return (
    <span className="primer-spec-diff">
      <del>{node}</del>
    </span>
  );
}

function genInsertion(node: Node): Node {
  return (
    <span className="primer-spec-diff">
      <ins>{node}</ins>
    </span>
  );
}

function genChangedTextNodes(oldNode: Text, newNode: Text): Node {
  const resultNode = document.createElement('span');
  const textChangeset = diffTextByWords(
    oldNode.textContent,
    newNode.textContent,
  );
  textChangeset.forEach((change) => {
    if (change.type === 'shared') {
      resultNode.appendChild(document.createTextNode(change.value));
    } else {
      resultNode.appendChild(
        <span className="primer-spec-diff">
          <del className="primer-spec-diff-text">{change.removed}</del>
          <ins className="primer-spec-diff-text">{change.inserted}</ins>
        </span>,
      );
    }
  });
  return resultNode;
}
