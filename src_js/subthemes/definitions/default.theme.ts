import { SubthemeDefinitionType } from '../Subtheme';
import common_dark_theme_colors from './common_dark_theme_colors';

const DEFAULT_DARK_SIDEBAR_BG_COLOR = 'rgb(25, 23, 29)';
const DEFAULT_DARK_MAIN_HEADING_COLOR = '#f2f2f2';
const DEFAULT_DARK_SIDEBAR_HEADING_COLOR = '#cccccc'; // darken(MAIN_HEADING_COLOR, 15%)
const DEFAULT_DARK_LINK_COLOR = '#68aefd'; // Derived by brightening default link color

const default_theme_vars: SubthemeDefinitionType = {
  light: { rouge_theme: 'default' },
  dark: {
    '--sidebar-bg-color': DEFAULT_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-heading-text-color': DEFAULT_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-heading-link-color': DEFAULT_DARK_SIDEBAR_HEADING_COLOR,

    '--sidebar-toc-h1-link-color': DEFAULT_DARK_LINK_COLOR,
    '--sidebar-toc-h1-border-color': DEFAULT_DARK_MAIN_HEADING_COLOR,
    '--sidebar-toc-h2-link-color': DEFAULT_DARK_LINK_COLOR,

    '--sidebar-active-toc-section-bg-color': '#b8ac05',
    '--sidebar-active-toc-section-link-color': DEFAULT_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-active-toc-h1-section-link-color': DEFAULT_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-active-toc-h2-section-link-color': DEFAULT_DARK_SIDEBAR_BG_COLOR,
    '--sidebar-toc-section-link-color': DEFAULT_DARK_SIDEBAR_HEADING_COLOR,

    '--main-heading-text-color': DEFAULT_DARK_MAIN_HEADING_COLOR,
    '--main-heading-link-color': DEFAULT_DARK_LINK_COLOR,
    '--main-link-color': DEFAULT_DARK_LINK_COLOR,
    '--hoverable-link-hover-color': 'white', // lighten(--main-link-color, 30%)

    '--main-bg-color': 'rgb(27, 29, 33)',
    ...common_dark_theme_colors,

    rouge_theme: 'monokai',
  },
};

export default default_theme_vars;
