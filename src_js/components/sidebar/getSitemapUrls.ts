import Config from '../../Config';

export type SitemapType = {
  rootPage: SitemapPageInfoType;
  siteUrls: Array<SitemapPageInfoType>;
};

/**
 * Parse raw sitemap information from `Config.ts` and return a data structure
 * that is easier to render.
 *
 * NOTE: The result of this method is not memoized.
 * @param sitemapEnabled boolean indicating whether to use sitemap URLs from
 *                       `Config.ts`
 */
export default function getSitemapUrls(
  sitemapEnabled: boolean,
): null | SitemapType {
  if (!sitemapEnabled) {
    return null;
  }

  // Remove assets pages
  const siteUrls = Config.SITEMAP_URLS.filter(
    (pageInfo) => !pageInfo.path.startsWith('assets'),
  );

  if (siteUrls.length === 0) {
    return null;
  }

  const rootIndex = siteUrls.findIndex((page) =>
    /^(index|readme)\.(md|htm|html)$/.test(page.path.toLowerCase()),
  );
  if (rootIndex === -1) {
    console.warn(
      'PrimerSpec: processSitemapURLs: Expected to find a root page. Disabling sitemap.',
    );
    return null;
  }

  const [rootPage] = siteUrls.splice(rootIndex, 1);
  rootPage.title = Config.SITEMAP_SITE_TITLE;

  siteUrls.sort((lhs, rhs) => {
    const lhsIndex = Config.SITEMAP_URL_ORDER.findIndex(
      (item) => item === lhs.title,
    );
    const rhsIndex = Config.SITEMAP_URL_ORDER.findIndex(
      (item) => item === rhs.title,
    );
    if (lhsIndex === -1) {
      // If lhs's order isn't specified, it should come before all items
      // with order specified.
      return -1;
    } else if (rhsIndex === -1) {
      // If rhs's order isn't specified but lhs's order is, then we know rhs
      // should be placed before lhs.
      return 1;
    }
    // If both items' order is specified, sort them based on whose title has a
    // lower index in the ordering list.
    return lhsIndex - rhsIndex;
  });

  return { rootPage, siteUrls };
}
