const MAIN_TEXT_COLOR = '#c9d1d9';
const CODE_COLOR = 'white';
const CODE_BG_COLOR = '#161b22';
const CODE_BORDER_COLOR = 'rgb(60, 62, 66)';
const CODE_BORDER = `1px solid ${CODE_BORDER_COLOR}`;
const BORDER_LINE_COLOR = '#21262d';

export default {
  '--sidebar-border-color': BORDER_LINE_COLOR,
  '--main-text-color': MAIN_TEXT_COLOR,
  '--main-table-pre-bg-color': CODE_BG_COLOR,
  '--main-table-pre-text-color': CODE_COLOR,
  '--main-table-pre-border': CODE_BORDER,
  '--tt-bg-color': 'rgba(240, 246, 252, 0.15)',
  '--tt-text-color': MAIN_TEXT_COLOR,
  '--tt-border-radius': '6px',
  // Use the sidebar active color for each theme
  '--sidebar-tt-active-bg-color': 'rgba(0, 0, 0, 0)',
  '--main-blockquote-text-color': '#8b949e',
  '--main-blockquote-text-border': '#3b434b',
  '--main-header-border-bottom-color': BORDER_LINE_COLOR,

  '--primer-spec-callout-neutral-bg-color': 'rgba(22, 27, 34, 0.8)',
  '--primer-spec-callout-neutral-text-color': MAIN_TEXT_COLOR,
  '--primer-spec-callout-neutral-border-color': 'rgb(48, 54, 61)',
  '--primer-spec-callout-info-bg-color': 'rgba(56, 139, 253, 0.1)',
  '--primer-spec-callout-info-text-color': '#79c0ff',
  '--primer-spec-callout-info-border-color': 'rgba(56, 139, 253, 0.4)',
  '--primer-spec-callout-warning-bg-color': 'rgba(187, 128, 9, 0.1)',
  '--primer-spec-callout-warning-text-color': '#e3b341',
  '--primer-spec-callout-warning-border-color': 'rgba(187, 128, 9, 0.4)',
  '--primer-spec-callout-danger-bg-color': 'rgba(248, 81, 73, 0.1)',
  '--primer-spec-callout-danger-text-color': '#ff7b72',
  '--primer-spec-callout-danger-border-color': 'rgba(248, 81, 73, 0.4)',
  '--primer-spec-callout-success-bg-color': 'rgba(46, 160, 67, 0.1)',
  '--primer-spec-callout-success-text-color': '#56d364',
  '--primer-spec-callout-success-border-color': 'rgba(46, 160, 67, 0.4)',

  '--code-block-default-color': MAIN_TEXT_COLOR,
  '--code-block-border-color': CODE_BORDER_COLOR,
  '--code-block-header-bg-color': CODE_BG_COLOR,
  '--code-block-bg-color': 'rgb(13, 17, 23)',
  '--code-block-line-number-color': '#484f58',
  '--code-block-highlight-bg-color': 'rgba(187, 128, 9, 0.15)',
  '--code-block-highlight-shadow-color': 'rgba(187, 128, 9, 0.4)',

  '--tooltip-background-color': 'rgb(110, 118, 129)',
  '--tooltip-color': 'white',
};
