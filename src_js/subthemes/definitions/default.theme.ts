import {SubthemeVarsType} from '../Subtheme.d';

const DEFAULT_LINK_COLOR = '#0366d6'; // From Primer Base
export const DEFAULT_BLOCKQUOTE_TEXT_COLOR = '#6a737d'; // From Primer Base

const default_theme_vars: SubthemeVarsType = {
  '--sidebar-bg-color': 'white',
  '--sidebar-heading-text-color': 'inherit',
  '--sidebar-heading-link-color': DEFAULT_LINK_COLOR,

  '--sidebar-toc-h1-link-color': DEFAULT_LINK_COLOR,
  '--sidebar-toc-h1-border-color': 'lightgrey',
  '--sidebar-toc-h2-link-color': DEFAULT_LINK_COLOR,

  '--sidebar-active-toc-section-bg-color': 'yellow',
  '--sidebar-active-toc-section-link-color': DEFAULT_LINK_COLOR,
  '--sidebar-toc-section-link-color': DEFAULT_LINK_COLOR,

  '--main-heading-text-color': 'inherit',
  '--main-heading-link-color': DEFAULT_LINK_COLOR,
  '--main-link-color': DEFAULT_LINK_COLOR,
  '--hoverable-link-hover-color': 'rgb(211, 85, 2)',

  '--main-bg-color': 'white',
  '--main-text-color': 'inherit',
  '--main-pre-bg-color': 'inherit',
  '--main-table-pre-text-color': 'inherit',
  '--main-blockquote-text-color': DEFAULT_BLOCKQUOTE_TEXT_COLOR,
};

export default default_theme_vars;
