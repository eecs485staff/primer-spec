import { SubthemeDefinitionType } from '../Subtheme';

const XCODE_DARK_BG_COLOR = 'rgb(40, 41, 35)';
const XCODE_DARK_TEXT_COLOR = 'white';
const XCODE_DARK_SIDEBAR_HEADING_COLOR = 'rgb(58, 58, 58)';
const XCODE_DARK_MAIN_HEADING_COLOR = 'rgb(137, 135, 205)';
const XCODE_DARK_MAIN_LINK_COLOR = 'rgb(222, 81, 78)';

const xcode_dark_theme_vars: SubthemeDefinitionType = {
  light: {
    '--sidebar-bg-color': 'rgb(242, 243, 243)',
    '--sidebar-heading-text-color': XCODE_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-heading-link-color': XCODE_DARK_SIDEBAR_HEADING_COLOR,

    '--sidebar-toc-h1-link-color': XCODE_DARK_SIDEBAR_HEADING_COLOR,
    '--sidebar-toc-h1-border-color': 'rgb(125, 125, 125)',
    '--sidebar-toc-h2-link-color': XCODE_DARK_SIDEBAR_HEADING_COLOR,

    '--sidebar-active-toc-section-bg-color': 'rgb(90, 151, 247)',
    '--sidebar-active-toc-section-link-color': 'white',
    '--sidebar-active-toc-h1-section-link-color': 'white',
    '--sidebar-active-toc-h2-section-link-color': 'white',
    '--sidebar-toc-section-link-color': XCODE_DARK_SIDEBAR_HEADING_COLOR,

    '--main-heading-text-color': XCODE_DARK_MAIN_HEADING_COLOR,
    '--main-heading-link-color': XCODE_DARK_MAIN_HEADING_COLOR,
    '--main-link-color': XCODE_DARK_MAIN_LINK_COLOR,
    '--hoverable-link-hover-color': '#7c1917', // darken($XCODE_DARK_MAIN_LINK_COLOR, 30%)

    '--main-bg-color': XCODE_DARK_BG_COLOR,
    '--main-text-color': XCODE_DARK_TEXT_COLOR,
    '--main-table-pre-bg-color': '#f6f8fa',
    '--main-table-pre-text-color': 'black',
    '--main-blockquote-text-color': '#ccc',
    '--main-tt-text-color': 'white',
    '--main-tt-bg-color': '#696969',

    rouge_theme: 'default',
  },
  dark: { rouge_theme: 'monokai' },
};

export default xcode_dark_theme_vars;
