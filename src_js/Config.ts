import Storage from './utils/Storage';

const SUBTHEME_NAME_STORAGE_KEY = 'spec_subtheme_name';
const SUBTHEME_MODE_STORAGE_KEY = 'spec_subtheme_mode';

const INIT_SUBTHEME_NAME = Storage.get(SUBTHEME_NAME_STORAGE_KEY) || 'default';
const INIT_SUBTHEME_MODE = (Storage.get(SUBTHEME_MODE_STORAGE_KEY) ||
  'system') as SubthemeModeSelectorType;

/**
 * Exposes config variables defined in the webpack config (as a plugin)
 * or in window.PrimerSpecConfig. Also exposes constants used throughout the
 * app.
 */
export default {
  // From webpack config
  BASE_URL: process.env.BASE_URL,
  VERSION_RAW: process.env.VERSION_RAW,
  VERSION_MINOR_STR: process.env.VERSION_MINOR_STR,

  // From window.PrimerSpecConfig
  HIDE_SIDEBAR_ON_LOAD: window.PrimerSpecConfig.hideSidebarOnLoad || false,
  INIT_SUBTHEME_NAME,
  INIT_SUBTHEME_MODE,

  // Other constants
  PRIMER_SPEC_APP_NODE_ID: 'primer-spec-app-container',
  PRIMER_SPEC_CONTENT_PLUGIN_NODE_ID: 'primer-spec-plugin-main-content',
  PRIMER_SPEC_CONTENT_PREACT_NODE_ID: 'primer-spec-preact-main-content',
  SUBTHEME_NAME_STORAGE_KEY,
  SUBTHEME_MODE_STORAGE_KEY,
  DEFAULT_ACTIVE_SECTION_OFFSET_Y: 10,
};

// Need to declare that the window object may have a PrimerSpecConfig.
declare global {
  interface Window {
    PrimerSpecConfig: {
      hideSidebarOnLoad?: boolean;
    };
  }

  type SubthemeModeSelectorType = 'light' | 'dark' | 'system';
  type SubthemeType = {
    name: string;
    mode: SubthemeModeSelectorType;
  };
}
