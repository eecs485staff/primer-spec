import { SubthemeDefinitionType } from '../Subtheme';
import common_dark_theme_colors from './common_dark_theme_colors';

const MODERN_PRIMARY_COLOR = 'rgb(41, 82, 91)';
const MODERN_SPECIAL_COLOR = 'rgb(229, 214, 204)';
const MODERN_SIDEBAR_CONTRAST_COLOR = 'rgb(114, 202, 195)';
const MODERN_MAIN_LINK_COLOR = 'rgb(233, 114, 110)';

const MODERN_DARK_HEADING_COLOR = 'rgb(79, 205, 196)';
const MODERN_DARK_SPECIAL_COLOR = 'rgb(242, 224, 213)';
const MODERN_DARK_SIDEBAR_BG_COLOR = 'rgb(22, 60, 60)';

const modern_theme_vars: SubthemeDefinitionType = {
  light: {
    '--sidebar-bg-color': MODERN_PRIMARY_COLOR,
    '--sidebar-heading-text-color': MODERN_SIDEBAR_CONTRAST_COLOR,
    '--sidebar-heading-link-color': MODERN_SIDEBAR_CONTRAST_COLOR,

    '--sidebar-toc-h1-link-color': MODERN_SPECIAL_COLOR,
    '--sidebar-toc-h1-border-color': MODERN_SPECIAL_COLOR,
    '--sidebar-toc-h2-link-color': 'white',

    '--sidebar-active-toc-section-bg-color': 'rgb(248, 255, 248)',
    '--sidebar-active-toc-section-link-color': MODERN_PRIMARY_COLOR,
    '--sidebar-active-toc-h1-section-link-color': MODERN_PRIMARY_COLOR,
    '--sidebar-active-toc-h2-section-link-color': MODERN_PRIMARY_COLOR,
    '--sidebar-toc-section-link-color': 'white',

    '--main-heading-text-color': MODERN_PRIMARY_COLOR,
    '--main-heading-link-color': MODERN_PRIMARY_COLOR,
    '--main-link-color': MODERN_MAIN_LINK_COLOR,
    '--tt-border-radius': '3px',
    '--hoverable-link-hover-color': '#a51e19', // darken($MODERN_MAIN_LINK_COLOR, 30%)

    rouge_theme: 'default',
  },
  dark: {
    '--sidebar-bg-color': MODERN_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-heading-link-color': MODERN_SIDEBAR_CONTRAST_COLOR,
    '--sidebar-heading-text-color': MODERN_SIDEBAR_CONTRAST_COLOR,

    '--sidebar-toc-h1-link-color': MODERN_DARK_SPECIAL_COLOR,
    '--sidebar-toc-h1-border-color': MODERN_DARK_SPECIAL_COLOR,
    '--sidebar-toc-h2-link-color': 'white',

    '--sidebar-active-toc-section-bg-color': 'rgb(248, 255, 248)',
    '--sidebar-active-toc-section-link-color': MODERN_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-active-toc-h1-section-link-color': MODERN_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-active-toc-h2-section-link-color': MODERN_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-toc-section-link-color': 'white',
    '--sidebar-tt-active-text-color': MODERN_DARK_SIDEBAR_BG_COLOR,

    '--main-heading-text-color': MODERN_DARK_HEADING_COLOR,
    '--main-heading-link-color': MODERN_DARK_HEADING_COLOR,
    '--main-link-color': MODERN_MAIN_LINK_COLOR,
    '--hoverable-link-hover-color': '#fdf3f3', // lighten($MODERN_MAIN_LINK_COLOR, 30%)

    '--main-bg-color': 'rgb(28, 28, 30)',

    ...common_dark_theme_colors,

    rouge_theme: 'monokai',
  },
};

export default modern_theme_vars;
