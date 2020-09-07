// Need to declare that the window object may have a PrimerSpecConfig.
// eslint-disable-next-line no-var
declare var PrimerSpecConfig: {
  hideSidebarOnLoad?: boolean;
  disableSidebar?: boolean;
  defaultSubthemeName?: string;
  defaultSubthemeMode?: string;
};

// Other global types
declare type SubthemeModeSelectorType = 'light' | 'dark' | 'system';
declare type SubthemeType = {
  name: string;
  mode: SubthemeModeSelectorType;
};
