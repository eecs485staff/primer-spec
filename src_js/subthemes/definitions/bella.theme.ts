import { SubthemeVarsType } from '../Subtheme';

const BELLA_PRIMARY_TEXT_COLOR = 'rgb(69, 98, 115)';
const BELLA_MAIN_LINK_COLOR = 'rgb(219, 71, 93)';

const bella_theme_vars: SubthemeVarsType = {
  '--sidebar-bg-color': 'rgb(246, 246, 246)',
  '--sidebar-heading-text-color': BELLA_PRIMARY_TEXT_COLOR,
  '--sidebar-heading-link-color': BELLA_MAIN_LINK_COLOR,

  '--sidebar-toc-h1-link-color': BELLA_PRIMARY_TEXT_COLOR,
  '--sidebar-toc-h1-border-color': BELLA_PRIMARY_TEXT_COLOR,
  '--sidebar-toc-h2-link-color': BELLA_PRIMARY_TEXT_COLOR,

  '--sidebar-active-toc-section-bg-color': BELLA_PRIMARY_TEXT_COLOR,
  '--sidebar-active-toc-section-link-color': 'white',
  '--sidebar-toc-section-link-color': 'rgb(58, 58, 58)',

  '--main-heading-text-color': BELLA_PRIMARY_TEXT_COLOR,
  '--main-heading-link-color': BELLA_MAIN_LINK_COLOR,
  '--main-link-color': BELLA_MAIN_LINK_COLOR,
  '--hoverable-link-hover-color': '#731624', // darken($BELLA_MAIN_LINK_COLOR, 30%)
};

export default bella_theme_vars;
