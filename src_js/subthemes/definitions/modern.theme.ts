import {SubthemeVarsType} from '../Subtheme';

const MODERN_PRIMARY_COLOR = 'rgb(41, 82, 91)';
const MODERN_SPECIAL_COLOR = 'rgb(229, 214, 204)';
const MODERN_SIDEBAR_CONTRAST_COLOR = 'rgb(114, 202, 195)';
const MODERN_MAIN_LINK_COLOR = 'rgb(233, 114, 110)';

const modern_theme_vars: SubthemeVarsType = {
  '--sidebar-bg-color': MODERN_PRIMARY_COLOR,
  '--sidebar-heading-text-color': MODERN_SIDEBAR_CONTRAST_COLOR,
  '--sidebar-heading-link-color': MODERN_SIDEBAR_CONTRAST_COLOR,

  '--sidebar-toc-h1-link-color': MODERN_SPECIAL_COLOR,
  '--sidebar-toc-h1-border-color': MODERN_SPECIAL_COLOR,
  '--sidebar-toc-h2-link-color': 'white',

  '--sidebar-active-toc-section-bg-color': 'rgb(248, 255, 248)',
  '--sidebar-active-toc-section-link-color': MODERN_PRIMARY_COLOR,
  '--sidebar-toc-section-link-color': 'white',

  '--main-heading-text-color': MODERN_PRIMARY_COLOR,
  '--main-heading-link-color': MODERN_PRIMARY_COLOR,
  '--main-link-color': MODERN_MAIN_LINK_COLOR,
  '--hoverable-link-hover-color': '#a51e19', // darken($MODERN_MAIN_LINK_COLOR, 30%)
};

export default modern_theme_vars;
