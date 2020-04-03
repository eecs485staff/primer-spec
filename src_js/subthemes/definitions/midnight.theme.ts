import { SubthemeVarsType } from '../Subtheme';

const MIDNIGHT_MAIN_HEADING_COLOR = '#f2f2f2';
const MIDNIGHT_SIDEBAR_HEADING_COLOR = '#cccccc'; // darken(MAIN_HEADING_COLOR, 15%)
const MIDNIGHT_TEXT_COLOR = 'rgb(209, 210, 211)';
const MIDNIGHT_CODE_COLOR = 'white';
const MIDNIGHT_CODE_BG_COLOR = 'rgb(35, 37, 41)';
const MIDNIGHT_CODE_BORDER = '1px solid rgb(60, 62, 66)';

const midnight_theme_vars: SubthemeVarsType = {
  '--sidebar-bg-color': 'rgb(25, 23, 29)',
  '--sidebar-heading-text-color': MIDNIGHT_SIDEBAR_HEADING_COLOR,
  '--sidebar-heading-link-color': MIDNIGHT_SIDEBAR_HEADING_COLOR,

  '--sidebar-toc-h1-link-color': MIDNIGHT_SIDEBAR_HEADING_COLOR,
  '--sidebar-toc-h1-border-color': MIDNIGHT_MAIN_HEADING_COLOR,
  '--sidebar-toc-h2-link-color': MIDNIGHT_SIDEBAR_HEADING_COLOR,

  '--sidebar-active-toc-section-bg-color': 'rgb(20, 100, 160)',
  '--sidebar-active-toc-section-link-color': 'rgb(250, 250, 250)',
  '--sidebar-active-toc-h1-section-link-color': 'rgb(250, 250, 250)',
  '--sidebar-active-toc-h2-section-link-color': 'rgb(250, 250, 250)',
  '--sidebar-toc-section-link-color': MIDNIGHT_SIDEBAR_HEADING_COLOR,

  '--main-heading-text-color': MIDNIGHT_MAIN_HEADING_COLOR,
  '--main-heading-link-color': MIDNIGHT_MAIN_HEADING_COLOR,
  '--main-link-color': 'rgb(72, 154, 204)',
  '--hoverable-link-hover-color': '#c0dced', // lighten(--main-link-color, 30%)

  '--main-bg-color': 'rgb(27, 29, 33)',
  '--main-text-color': MIDNIGHT_TEXT_COLOR,
  '--main-table-pre-bg-color': MIDNIGHT_CODE_BG_COLOR,
  '--main-table-pre-text-color': MIDNIGHT_CODE_COLOR,
  '--main-table-pre-border': MIDNIGHT_CODE_BORDER,
  '--main-tt-bg-color': MIDNIGHT_CODE_BG_COLOR,
  '--main-tt-text-color': MIDNIGHT_CODE_COLOR,
  '--main-tt-border': MIDNIGHT_CODE_BORDER,
  '--main-blockquote-text-color': '#999999',

  rouge_theme: 'monokai',
};

export default midnight_theme_vars;
