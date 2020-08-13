// Need to declare that the window object may have a PrimerSpecConfig.
declare var PrimerSpecConfig: {
  hideSidebarOnLoad?: boolean;
};

// Other global types
declare type SubthemeModeSelectorType = 'light' | 'dark' | 'system';
declare type SubthemeType = {
  name: string;
  mode: SubthemeModeSelectorType;
};
