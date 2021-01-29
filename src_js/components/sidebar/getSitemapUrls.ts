import Config from '../../Config';

export type SitemapType = {
  rootPage: SitemapPageInfoType;
  siteUrls: Array<SitemapPageInfoType>;
};

export default function getSitemapUrls(): null | SitemapType {
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

  return { rootPage, siteUrls };
}
