export type SitemapPageType = { name: string; url: string };
export type SitemapNodePageType = {
  page: SitemapPageType;
  childPages: Array<SitemapNodePageType>;
  childDirs: Array<SitemapNodeDirType>;
};
export type SitemapNodeDirType = {
  dir: string;
  title: string;
  childPages: Array<SitemapNodePageType>;
  childDirs: Array<SitemapNodeDirType>;
};
export type SitemapNodeType = SitemapNodePageType | SitemapNodeDirType;

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
): SitemapNodePageType | null {
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

  const rootNode: SitemapNodePageType = {
    page: { name: rootPageInfo.title || siteTitle, url: rootPageInfo.url },
    childPages: [],
    childDirs: [],
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
  rootNode: SitemapNodeType,
): void {
  const pathParts = path.split('/');
  if (pathParts.length === 1) {
    // It's a page
    const name = title || getSitemapName(path);
    const page: SitemapPageType = { name, url };
    const newNode: SitemapNodePageType = {
      page,
      childPages: [],
      childDirs: [],
    };
    rootNode.childPages.push(newNode);
  } else {
    // It's a dir
    const dir = pathParts[0];
    const restOfPath = pathParts.slice(1).join('/');

    // Check if the directory has already been added
    const indexOfDir = rootNode.childDirs.findIndex(
      (child) => child.dir === dir,
    );
    if (indexOfDir !== -1) {
      // Add to the existing dir
      addPathToNode(restOfPath, url, title, rootNode.childDirs[indexOfDir]);
    } else {
      // Need to create a new directory
      const dirTitle = getSitemapName(dir);
      const newNode: SitemapNodeDirType = {
        dir,
        title: dirTitle,
        childPages: [],
        childDirs: [],
      };

      addPathToNode(restOfPath, url, title, newNode);
      rootNode.childDirs.push(newNode);
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
