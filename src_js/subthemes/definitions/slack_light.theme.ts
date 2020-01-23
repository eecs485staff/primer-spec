import {SubthemeVarsType} from '../Subtheme';

const SLACK_LIGHT_SIDEBAR_TEXT_COLOR = 'rgb(198, 183, 194)';
const SLACK_LIGHT_SIDEBAR_H1_TEXT_COLOR = '#d1c5ce';

const slack_light_theme_vars: SubthemeVarsType = {
  '--sidebar-bg-color': 'rgb(63, 17, 63)',
  '--sidebar-heading-text-color': SLACK_LIGHT_SIDEBAR_TEXT_COLOR,
  '--sidebar-heading-link-color': SLACK_LIGHT_SIDEBAR_TEXT_COLOR,

  '--sidebar-toc-h1-link-color': SLACK_LIGHT_SIDEBAR_H1_TEXT_COLOR,
  '--sidebar-toc-h1-border-color': SLACK_LIGHT_SIDEBAR_H1_TEXT_COLOR,
  '--sidebar-toc-h2-link-color': SLACK_LIGHT_SIDEBAR_H1_TEXT_COLOR,

  '--sidebar-active-toc-section-bg-color': 'rgb(15, 100, 164)',
  '--sidebar-active-toc-section-link-color': 'white',
  '--sidebar-toc-section-link-color': SLACK_LIGHT_SIDEBAR_TEXT_COLOR,
};

export default slack_light_theme_vars;
