import { SubthemeDefinitionType } from '../Subtheme';
import common_dark_theme_colors from './common_dark_theme_colors';

const BELLA_PRIMARY_TEXT_COLOR = 'rgb(69, 98, 115)';
const BELLA_MAIN_LINK_COLOR = 'rgb(219, 71, 93)';

const BELLA_DARK_PRIMARY_COLOR = 'rgb(67, 116, 121)';
const BELLA_DARK_PRIMARY_HEADING_COLOR = '#61a1a8'; // lighten($BELLA_DARK_PRIMARY_COLOR, 15%)
const BELLA_DARK_MAIN_LINK_COLOR = 'rgb(218, 128, 131)';
const BELLA_DARK_SIDEBAR_HEADING_COLOR = 'white';

const bella_theme_vars: SubthemeDefinitionType = {
  light: {
    '--sidebar-bg-color': 'rgb(246, 246, 246)',
    '--sidebar-heading-text-color': BELLA_PRIMARY_TEXT_COLOR,
    '--sidebar-heading-link-color': BELLA_MAIN_LINK_COLOR,

    '--sidebar-toc-h1-link-color': BELLA_PRIMARY_TEXT_COLOR,
    '--sidebar-toc-h1-border-color': BELLA_PRIMARY_TEXT_COLOR,
    '--sidebar-toc-h2-link-color': BELLA_PRIMARY_TEXT_COLOR,

    '--sidebar-active-toc-section-bg-color': BELLA_PRIMARY_TEXT_COLOR,
    '--sidebar-active-toc-section-link-color': 'white',
    '--sidebar-active-toc-h1-section-link-color': 'white',
    '--sidebar-active-toc-h2-section-link-color': 'white',
    '--sidebar-toc-section-link-color': 'rgb(58, 58, 58)',

    '--main-heading-text-color': BELLA_PRIMARY_TEXT_COLOR,
    '--main-heading-link-color': BELLA_MAIN_LINK_COLOR,
    '--main-link-color': BELLA_MAIN_LINK_COLOR,
    '--hoverable-link-hover-color': '#731624', // darken($BELLA_MAIN_LINK_COLOR, 30%)

    rouge_theme: 'default',
  },
  dark: {
    '--sidebar-bg-color': 'rgb(58, 58, 60)',
    '--sidebar-heading-text-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-heading-link-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,

    '--sidebar-toc-h1-link-color': BELLA_DARK_PRIMARY_HEADING_COLOR,
    '--sidebar-toc-h1-border-color': BELLA_DARK_PRIMARY_HEADING_COLOR,
    '--sidebar-toc-h2-link-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,

    '--sidebar-active-toc-section-bg-color': BELLA_DARK_PRIMARY_COLOR,
    '--sidebar-active-toc-section-link-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-active-toc-h1-section-link-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-active-toc-h2-section-link-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-toc-section-link-color': BELLA_DARK_SIDEBAR_HEADING_COLOR,

    '--main-heading-text-color': BELLA_DARK_PRIMARY_HEADING_COLOR,
    '--main-heading-link-color': BELLA_DARK_MAIN_LINK_COLOR,
    '--main-link-color': BELLA_DARK_MAIN_LINK_COLOR,
    '--hoverable-link-hover-color': '#fdf6f7', // lighten($BELLA_DARK_MAIN_LINK_COLOR, 30%)

    '--main-bg-color': 'rgb(28, 28, 30)',
    ...common_dark_theme_colors,

    rouge_theme: 'monokai',
  },
};

export default bella_theme_vars;
