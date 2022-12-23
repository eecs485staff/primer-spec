// Need to declare that the window object may have a PrimerSpecConfig.
// eslint-disable-next-line no-var
declare var PrimerSpecConfig: {
  pdfPath?: string | null;
  siteQualifiedBaseUrl?: string;
  hideSidebarOnLoad?: boolean;
  disableSidebar?: boolean;
  defaultSubthemeName?: string;
  defaultSubthemeMode?: string;
  sitemapUrls?: Array<SitemapPageInfoType>;
  sitemapLabel?: string;
  sitemapEnabled?: boolean;
  sitemapSiteTitle?: string;
  useLegacyCodeBlocks?: boolean /* DEPRECATED in v1.7.0 */;
  defaultCodeblockVariant?: string;
  disableJokes?: boolean;
};

// Other global types
declare type SubthemeModeType = 'light' | 'dark';
declare type SubthemeModeSelectorType = SubthemeModeType | 'system';
declare type SubthemeSelectionType = {
  name: string;
  mode: SubthemeModeSelectorType;
};

declare type SitemapPageInfoType = {
  url: string;
  path?: string;
  external?: boolean;
  sitemapOrder?: number;
  title?: string;
  current?: boolean;
};

// eslint-disable-next-line
declare var mermaid: {
  mermaidAPI: {
    initialize(config: {
      securityLevel?: 'loose' | 'strict' | 'antiscript' | 'sandbox';
      startOnLoad: boolean;
      theme: 'default' | 'neutral' | 'forest' | 'dark';
    }): void;
    render(
      id: string,
      graphDefinition: string,
      callback: (svgHtml: string) => void,
    ): string;
  };
};

// eslint-disable-next-line
declare var PrimerSpec: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  REGISTERED_SUBTHEMES?: any;
  registerNewSubtheme?: (
    name: string,
    label: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subthemeDefinition: any,
  ) => void;
  updateTheme?: (
    updates: {
      name?: string;
      mode?: SubthemeModeSelectorType;
    },
    persistUpdate?: boolean,
  ) => void;
};
