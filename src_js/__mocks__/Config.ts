export default {
  VERSION_RAW: 'VERSION_RAW',
  VERSION_MINOR_STR: 'VERSION_MINOR_STR',
  BUILD_MODE: 'development',

  // From window.PrimerSpecConfig
  HIDE_SIDEBAR_ON_LOAD: false,
  DISABLE_SIDEBAR: false,
  INIT_SUBTHEME_NAME: 'default',
  INIT_SUBTHEME_MODE: 'system',
  INIT_SITEMAP_ENABLED: false,
  SITEMAP_URLS: [],
  SITEMAP_LABEL: 'Supplemental Pages',
  SITEMAP_SITE_TITLE: '',
  USE_LEGACY_CODE_BLOCKS: false,

  // Other constants
  PRIMER_SPEC_APP_NODE_ID: 'primer-spec-app-container',
  PRIMER_SPEC_CONTENT_PLUGIN_NODE_ID: 'primer-spec-plugin-main-content',
  PRIMER_SPEC_CONTENT_PREACT_NODE_ID: 'primer-spec-preact-main-content',
  SUBTHEME_NAME_STORAGE_KEY: 'spec_subtheme_name',
  SUBTHEME_MODE_STORAGE_KEY: 'spec_subtheme_mode',
  DEFAULT_ACTIVE_SECTION_OFFSET_Y: 10,
  DIFF_HTML_STORAGE_TTL: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
};
