import { SubthemeDefinitionType } from '../Subtheme';
import common_dark_theme_colors from './common_dark_theme_colors';

const DEFAULT_DARK_BG_COLOR = '#0d1117'; // GitHub's dark mode background color
const DEFAULT_DARK_MAIN_HEADING_COLOR = '#e7ebee'; // lighten(#c9d1d9 (MAIN_TEXT_COLOR), 10%)
const DEFAULT_DARK_SIDEBAR_HEADING_COLOR = '#cccccc'; // darken(MAIN_HEADING_COLOR, 15%)
const DEFAULT_DARK_LINK_COLOR = '#58a6ff'; // GitHub's dark mode link color

const default_theme_vars: SubthemeDefinitionType = {
  light: { rouge_theme: 'default' },
  dark: {
    '--sidebar-bg-color': DEFAULT_DARK_BG_COLOR,
    '--sidebar-heading-text-color': DEFAULT_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-heading-link-color': DEFAULT_DARK_SIDEBAR_HEADING_COLOR,

    '--sidebar-toc-h1-link-color': DEFAULT_DARK_LINK_COLOR,
    '--sidebar-toc-h1-border-color': '#555',
    '--sidebar-toc-h2-link-color': DEFAULT_DARK_LINK_COLOR,

    '--sidebar-active-toc-section-bg-color': '#e4d93f',
    '--sidebar-active-toc-section-link-color': DEFAULT_DARK_BG_COLOR,
    '--sidebar-active-toc-h1-section-link-color': DEFAULT_DARK_BG_COLOR,
    '--sidebar-active-toc-h2-section-link-color': DEFAULT_DARK_BG_COLOR,
    '--sidebar-toc-section-link-color': DEFAULT_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-tt-active-text-color': DEFAULT_DARK_BG_COLOR,

    '--main-heading-text-color': DEFAULT_DARK_MAIN_HEADING_COLOR,
    '--main-heading-link-color': DEFAULT_DARK_LINK_COLOR,
    '--main-link-color': DEFAULT_DARK_LINK_COLOR,
    '--hoverable-link-hover-color': '#9dd2fb', // lighten(--main-link-color, 30%)

    '--main-bg-color': DEFAULT_DARK_BG_COLOR,

    '--gist-button-hover-color': DEFAULT_DARK_LINK_COLOR,

    ...common_dark_theme_colors,

    rouge_theme: 'monokai',
  },
};

export default default_theme_vars;
