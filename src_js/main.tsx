import * as AnchorJS from 'anchor-js';
import { h, render, Fragment } from 'preact';
import { Provider } from 'redux-zero/preact';
import store from './store';
import { updateTheme } from './SubthemeSettings';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/Topbar';
import Settings from './components/Settings';

const rawHeadTags = require('../_includes/spec_head_tags.html');

const $main_content = $('#primer-spec-plugin-main-content');

/**
 * Checks whether current HTML page is designed to use Primer Spec as a plugin.
 */
function is_html_compatible_with_primer_spec() {
  // NOTE: This function can make more sophisticated checks in the future.
  return (
    $main_content &&
    $main_content.length === 1 &&
    $main_content.prop('tagName') === 'DIV'
  );
}

function format_main_content() {
  // NOTE: Keep this in sync with the list in _layouts/spec.html
  const class_list = [
    'container-lg',
    'px-3',
    'my-5',
    'markdown-body',
    'primer-spec-content-margin-extra',
  ];
  $main_content.addClass(class_list.join(' '));
}

function inject_theme_html() {
  const $head_links = $(rawHeadTags);
  $('head').append($head_links);

  // Listen for changes to system theme (light/dark mode)
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addListener(() => updateTheme({}));

  render(
    <Fragment>
      <Provider store={store}>
        <Sidebar contentNodeSelector="#primer-spec-plugin-main-content" />
      </Provider>
      <Provider store={store}>
        <Topbar />
      </Provider>
      <Provider store={store}>
        <Settings />
      </Provider>
    </Fragment>,
    document.getElementById('primer-spec-app-container')!, // TODO: Remove null cast
  );
}

function main() {
  const anchors = new AnchorJS();
  anchors.add('h1');
  anchors.add();

  if (!is_html_compatible_with_primer_spec()) {
    console.warn(
      'This page included the Primer Spec plugin script, but was not compatible with the plugin!',
    );
  }

  format_main_content();
  inject_theme_html();
}

main();
