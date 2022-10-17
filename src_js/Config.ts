import Storage from './utils/Storage';
import { CodeblockVariant } from './components/main_content/enhanced_code_blocks/codeblockConsts';

const SUBTHEME_NAME_STORAGE_KEY = 'spec_subtheme_name';
const SUBTHEME_MODE_STORAGE_KEY = 'spec_subtheme_mode';

const INIT_SUBTHEME_NAME =
  Storage.get(SUBTHEME_NAME_STORAGE_KEY) ||
  window.PrimerSpecConfig.defaultSubthemeName ||
  'default';
const INIT_SUBTHEME_MODE = (Storage.get(SUBTHEME_MODE_STORAGE_KEY) ||
  window.PrimerSpecConfig.defaultSubthemeMode ||
  'system') as SubthemeModeSelectorType;
const INIT_SITEMAP_ENABLED = getInitSitemapEnabled();

/**
 * Exposes config variables defined in the webpack config (as a plugin)
 * or in window.PrimerSpecConfig. Also exposes constants used throughout the
 * app.
 */
export default {
  // From webpack config
  VERSION_RAW: process.env.VERSION_RAW,
  VERSION_MINOR_STR: process.env.VERSION_MINOR_STR,
  BUILD_MODE: process.env.BUILD_MODE,

  // From window.PrimerSpecConfig
  HIDE_SIDEBAR_ON_LOAD: getHideSidebarOnLoad(),
  DISABLE_SIDEBAR: window.PrimerSpecConfig.disableSidebar || false,
  INIT_SUBTHEME_NAME,
  INIT_SUBTHEME_MODE,
  INIT_SITEMAP_ENABLED,
  SITEMAP_URLS: window.PrimerSpecConfig.sitemapUrls || [],
  SITEMAP_LABEL: getSitemapLabel(),
  SITEMAP_SITE_TITLE: window.PrimerSpecConfig.sitemapSiteTitle || '',
  DEFAULT_CODEBLOCK_VARIANT: getDefaultCodeblockVariant(),

  // DEPRECATED in v1.7.0. Use `DEFAULT_CODEBLOCK_VARIANT` instead.
  USE_LEGACY_CODE_BLOCKS_DEPRECATED_DO_NOT_USE:
    window.PrimerSpecConfig.useLegacyCodeBlocks || false,

  // Other constants
  PRIMER_SPEC_APP_NODE_ID: 'primer-spec-app-container',
  PRIMER_SPEC_CONTENT_PLUGIN_NODE_ID: 'primer-spec-plugin-main-content',
  PRIMER_SPEC_CONTENT_PREACT_NODE_ID: 'primer-spec-preact-main-content',
  SUBTHEME_NAME_STORAGE_KEY,
  SUBTHEME_MODE_STORAGE_KEY,
  DEFAULT_ACTIVE_SECTION_OFFSET_Y: 10,
};

function getHideSidebarOnLoad() {
  const sidebar_hidden_stored_value: string | null = Storage.getForPage(
    'sidebar_hidden',
  );
  let hideSidebar = false;
  if (sidebar_hidden_stored_value !== null) {
    hideSidebar = sidebar_hidden_stored_value === 'true';
  } else {
    hideSidebar =
      window.PrimerSpecConfig.hideSidebarOnLoad ||
      window.PrimerSpecConfig.disableSidebar ||
      false;
    Storage.setForPage('sidebar_hidden', hideSidebar.toString());
  }

  return hideSidebar;
}

function getInitSitemapEnabled() {
  if (process.env.BUILD_MODE === 'development') {
    const searchParams = new URLSearchParams(document.location.search);
    const sitemapEnabledFromUrl = searchParams.get('enable_sitemap');
    if (sitemapEnabledFromUrl != null) {
      return sitemapEnabledFromUrl === '1';
    }
  }

  return !!window.PrimerSpecConfig.sitemapEnabled;
}

function getDefaultCodeblockVariant(): CodeblockVariant {
  if (window.PrimerSpecConfig.useLegacyCodeBlocks === true) {
    // Note that `useLegacyCodeBlocks` is deprecated in v1.7.0. This code
    // just ensures backwards-compatibility.
    return CodeblockVariant.LEGACY;
  }
  const maybeVariant = window.PrimerSpecConfig.defaultCodeblockVariant?.toLowerCase() as CodeblockVariant | null;
  if (maybeVariant && Object.values(CodeblockVariant).includes(maybeVariant)) {
    return maybeVariant;
  }
  return CodeblockVariant.ENHANCED;
}

function getSitemapLabel(): null | string {
  if (window.PrimerSpecConfig.sitemapLabel === null) {
    return null;
  }
  return window.PrimerSpecConfig.sitemapLabel || 'Supplemental Pages';
}
