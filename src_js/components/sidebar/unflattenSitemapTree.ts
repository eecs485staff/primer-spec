export type SitemapPageType = { name: string; url: string };
export type SitemapNodePageType = {
  type: 'page';
  page: SitemapPageType;
  children: Array<SitemapTreeNode>;
};
export type SitemapNodeDirType = {
  type: 'dir';
  dir: string;
  title: string;
  children: Array<SitemapTreeNode>;
};
export type SitemapTreeNode = SitemapNodePageType | SitemapNodeDirType;

/**
 * Convert a list of sitemap entries into a structured sitemap tree
 * representation.
 * @param sitemapPagesInfo An array of sitemap page paths and URLs. One of the
 *                         paths MUST be `/`.
 */
export default function unflattenSitemapTree(
  // TODO: Figure out why ESLint complains about the type being undefined.
  // eslint-disable-next-line no-undef
  sitemapPagesInfo: Array<SitemapPageInfoType>,
  siteTitle: string,
): null | SitemapTreeNode {
  // Require a root page, and remove it from the list of pages.
  // Root pages path always starts with 'index' or 'README', and could be
  // a Markdown or HTML file.
  const rootPageIndex = sitemapPagesInfo.findIndex((sitemapPageInfo) =>
    /^(index|readme)\.(md|htm|html)$/.test(sitemapPageInfo.path.toLowerCase()),
  );
  if (rootPageIndex === -1) {
    console.debug('Primer Spec: unflattenSitemapTree: Root page not provided');
    return null;
  }
  const [rootPageInfo] = sitemapPagesInfo.splice(rootPageIndex, 1);

  // Remove assets pages
  sitemapPagesInfo = sitemapPagesInfo.filter(
    (pageInfo) => !pageInfo.path.startsWith('assets'),
  );

  // If there are no other pages, then don't display a sitemap
  if (!sitemapPagesInfo.length) {
    return null;
  }

  const rootNode: SitemapTreeNode = {
    type: 'page',
    page: { name: rootPageInfo.title || siteTitle, url: rootPageInfo.url },
    children: [],
  };

  sitemapPagesInfo.forEach((pageInfo) => {
    addPathToNode(pageInfo.path, pageInfo.url, pageInfo.title, rootNode);
  });

  return rootNode;
}

function addPathToNode(
  path: string,
  url: string,
  title: string | undefined,
  rootNode: SitemapTreeNode,
): void {
  const pathParts = path.split('/');
  if (pathParts.length === 1) {
    const name = title || getSitemapName(path);
    const page: SitemapPageType = { name, url };
    const newNode: SitemapNodePageType = { type: 'page', page, children: [] };
    rootNode.children.push(newNode);
  } else {
    const dir = pathParts[0];
    const restOfPath = pathParts.slice(1).join('/');

    // Check if the directory has already been added
    const indexOfDir = rootNode.children.findIndex(
      (child) => child.type === 'dir' && child.dir === dir,
    );
    if (indexOfDir === -1) {
      // Need to create a new directory
      const dirTitle = getSitemapName(dir);
      const newNode: SitemapNodeDirType = {
        type: 'dir',
        dir,
        title: dirTitle,
        children: [],
      };

      addPathToNode(restOfPath, url, title, newNode);
      rootNode.children.push(newNode);
    } else {
      // Add to the existing dir
      addPathToNode(restOfPath, url, title, rootNode.children[indexOfDir]);
    }
  }
}

export function getSitemapName(pathName: string): string {
  const dotIndex = pathName.lastIndexOf('.');
  if (dotIndex !== -1) {
    pathName = pathName.slice(0, dotIndex);
  }

  // Replace hyphens and underscores with spaces
  pathName = pathName.replace(/[-_]/g, ' ');

  return toTitleCase(pathName);
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
