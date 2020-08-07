/**
 * Exposes config variables defined in the webpack config (as a plugin)
 * or in window.PrimerSpecConfig.
 */
export default {
  BASE_URL: process.env.BASE_URL,
  VERSION_RAW: process.env.VERSION_RAW,

  HIDE_SIDEBAR_ON_LOAD: window.PrimerSpecConfig.hideSidebarOnLoad || false,
  DEFAULT_SUBTHEME_NAME: 'default',
  DEFAULT_SUBTHEME_MODE: 'system' as SubthemeModeSelectorType,
};

// Need to declare that the window object may have a PrimerSpecConfig.
declare global {
  interface Window {
    PrimerSpecConfig: {
      hideSidebarOnLoad?: boolean;
    };
  }

  type SubthemeModeSelectorType = 'light' | 'dark' | 'system';
}
