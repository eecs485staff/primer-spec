// Need to declare that the window object may have a PrimerSpecConfig.
// eslint-disable-next-line no-var
declare var PrimerSpecConfig: {
  hideSidebarOnLoad?: boolean;
  disableSidebar?: boolean;
  defaultSubthemeName?: string;
  defaultSubthemeMode?: string;
  sitemapUrls?: Array<SitemapPageInfoType>;
  sitemapCustomLinks: Array<SitemapCustomLinksType>;
  sitemapSiteTitle?: string;
};

// Other global types
declare type SubthemeModeSelectorType = 'light' | 'dark' | 'system';
declare type SubthemeType = {
  name: string;
  mode: SubthemeModeSelectorType;
};

declare type SitemapPageInfoType = {
  url: string;
  path: string;
  title?: string;
  current?: boolean;
};

declare type SitemapCustomLinksType = {
  title: string;
  url?: string;
  pages?: Array<SitemapCustomLinksType>;
};
