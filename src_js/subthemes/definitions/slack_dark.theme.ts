import {SubthemeVarsType} from '../Subtheme';

const SLACK_DARK_MAIN_HEADING_COLOR = '#f2f2f2';
const SLACK_DARK_SIDEBAR_HEADING_COLOR = '#cccccc'; // darken(MAIN_HEADING_COLOR, 15%)
const SLACK_DARK_TEXT_COLOR = 'rgb(209, 210, 211)';

const slack_dark_theme_vars: SubthemeVarsType = {
  '--sidebar-bg-color': 'rgb(25, 23, 29)',
  '--sidebar-heading-text-color': SLACK_DARK_SIDEBAR_HEADING_COLOR,
  '--sidebar-heading-link-color': SLACK_DARK_SIDEBAR_HEADING_COLOR,

  '--sidebar-toc-h1-link-color': SLACK_DARK_SIDEBAR_HEADING_COLOR,
  '--sidebar-toc-h1-border-color': SLACK_DARK_MAIN_HEADING_COLOR,
  '--sidebar-toc-h2-link-color': SLACK_DARK_SIDEBAR_HEADING_COLOR,

  '--sidebar-active-toc-section-bg-color': 'rgb(20, 100, 160)',
  '--sidebar-active-toc-section-link-color': 'rgb(250, 250, 250)',
  '--sidebar-toc-section-link-color': SLACK_DARK_SIDEBAR_HEADING_COLOR,

  '--main-heading-text-color': SLACK_DARK_MAIN_HEADING_COLOR,
  '--main-heading-link-color': SLACK_DARK_MAIN_HEADING_COLOR,
  '--main-link-color': 'rgb(72, 154, 204)',
  '--hoverable-link-hover-color': '#c0dced', // lighten(--main-link-color, 30%)

  '--main-bg-color': 'rgb(27, 29, 33)',
  '--main-text-color': SLACK_DARK_TEXT_COLOR,
  '--main-table-pre-bg-color': 'rgb(35, 37, 41)',
  '--main-table-pre-text-color': 'white',
  '--main-table-pre-border': '1px solid rgb(60, 62, 66)',
  '--main-blockquote-text-color': '#999999',

  'rouge_theme': 'monokai',
};

export default slack_dark_theme_vars;
