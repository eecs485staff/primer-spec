import AnchorJS from 'anchor-js';
import { h, render } from 'preact';
import PrimerSpec from './components/PrimerSpec';
import Config from './Config';
import { updateTheme } from './subthemes';

/**
 * The entry point to the Primer Spec JS.
 */
function main() {
  const anchors = new AnchorJS();
  anchors.add('h1');
  anchors.add();

  const main_content_node = document.getElementById(
    Config.PRIMER_SPEC_CONTENT_PLUGIN_NODE_ID,
  );
  const app_container_node = document.getElementById(
    Config.PRIMER_SPEC_APP_NODE_ID,
  );

  if (
    !main_content_node ||
    main_content_node.tagName !== 'DIV' ||
    !app_container_node ||
    app_container_node.tagName !== 'DIV'
  ) {
    throw new Error(
      'Primer Spec: This page included the Primer Spec plugin script, but was not compatible with the plugin!',
    );
  }

  const main_content_html = main_content_node.innerHTML;
  main_content_node.remove();

  injectPrimerSpecStyleSheets();

  // Initialize the theme variables
  updateTheme(
    {
      name: Config.INIT_SUBTHEME_NAME,
      mode: Config.INIT_SUBTHEME_MODE,
    },
    false,
  );
  // Listen for changes to the OS system theme.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addListener(() => updateTheme());

  render(<PrimerSpec contentHTML={main_content_html} />, app_container_node);

  // To make the theme more discoverable for potential contributors:
  console.info(
    '\nThis page is formatted using %cPrimer Spec.%c\n\nWould you like to contribute to the theme? Check out:\nhttps://github.com/eecs485staff/primer-spec\n',
    'font-weight: bolder;',
    '',
  );
}

function injectPrimerSpecStyleSheets() {
  injectStyleSheet(
    'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
    'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
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
