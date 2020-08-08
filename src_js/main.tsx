import * as AnchorJS from 'anchor-js';
import { h, render } from 'preact';
import { Provider } from 'redux-zero/preact';
import store from './store';
import PrimerSpec from './components/PrimerSpec';
import PrimerSpecContent from './components/PrimerSpecContent';
import Config from './Config';

function main() {
  const anchors = new AnchorJS();
  anchors.add('h1');
  anchors.add();

  const main_content_node = document.getElementById(
    'primer-spec-plugin-main-content',
  );
  const content_container_node = document.getElementById(
    'primer-spec-app-content-container',
  );
  const app_container_node = document.getElementById(
    'primer-spec-app-container',
  );

  if (
    !main_content_node ||
    main_content_node.tagName !== 'DIV' ||
    !content_container_node ||
    content_container_node.tagName !== 'DIV' ||
    !app_container_node ||
    app_container_node.tagName !== 'DIV'
  ) {
    throw new Error(
      'Primer Spec: This page included the Primer Spec plugin script, but was not compatible with the plugin!',
    );
  }

  const main_content_html = main_content_node.innerHTML;

  injectPrimerSpecStyleSheets();

  // Need to render main content before Sidebar (so that the headings are
  // found).
  render(
    <Provider store={store}>
      <PrimerSpecContent innerHTML={main_content_html} />
    </Provider>,
    content_container_node,
  );

  render(
    <Provider store={store}>
      <PrimerSpec />
    </Provider>,
    app_container_node,
  );
}

function injectPrimerSpecStyleSheets() {
  injectStyleSheet(
    'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
    'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
    'anonymous',
  );
  injectStyleSheet(
    `${Config.BASE_URL}/assets/${Config.VERSION_STR}/css/primer-spec-base.css`,
    null,
    'anonymous',
  );
}

function injectStyleSheet(
  href: string,
  integrity?: string | null,
  crossOrigin?: string | null,
) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  if (integrity) {
    link.integrity = integrity;
  }
  if (crossOrigin) {
    link.crossOrigin = crossOrigin;
  }

  document.head.appendChild(link);
}

main();
