import { Fragment, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import {
  getStoredSubthemeMode,
  getStoredSubthemeName,
  updateTheme,
  normalizeSubthemeMode,
} from '../subthemes';
import getChromeVersion from '../utils/getChromeVersion';
import { useAfterPrint, useBeforePrint } from '../utils/hooks/print';
import useSmallScreen from '../utils/hooks/useSmallScreen';
import Config from '../Config';
import MainContent from './main_content';
import Settings from './settings';
import Sidebar from './sidebar';
import Topbar from './Topbar';
import Storage from '../utils/Storage';

type PropsType = { contentHTML: string };

let mainElScrollPosition: null | { top: number; left: number } = null;

/**
 * This component encapsulates the JS controlling Primer Spec, including the
 * Sidebar, the Topbar and the Settings pane.
 */
export default function PrimerSpec(props: PropsType): h.JSX.Element {
  // Initialize all shared state
  const is_small_screen = useSmallScreen();
  const [sidebar_shown, setSidebarShown] = useState(
    !Config.HIDE_SIDEBAR_ON_LOAD && !is_small_screen,
  );
  const [settings_shown, setSettingsShown] = useState(false);
  const [active_section_offset_y, setActiveSectionOffsetY] = useState(
    Config.DEFAULT_ACTIVE_SECTION_OFFSET_Y,
  );
  const [subtheme_name, setSubthemeName] = useState(Config.INIT_SUBTHEME_NAME);
  const [subtheme_mode, setSubthemeMode] = useState(Config.INIT_SUBTHEME_MODE);
  const [sitemap_enabled, setSitemapEnabled] = useState(
    Config.INIT_SITEMAP_ENABLED,
  );

  const main_content_visible = !settings_shown;

  // Define derived methods to manipulate state
  const toggleSidebarShown = () => {
    Storage.setForPage('sidebar_hidden', sidebar_shown.toString());
    setSidebarShown(!sidebar_shown);
  };
  const toggleSettingsShown = () => {
    // Before toggling the settings, save the current scroll position of the
    // main content. We'll need it later to restore the scroll position after
    // the settings pane is closed.
    if (main_content_visible) {
      mainElScrollPosition = { top: window.scrollY, left: window.scrollX };
    }
    setSettingsShown(!settings_shown);
  };
  const setTheme = (themeDelta: Partial<SubthemeSelectionType>) => {
    updateTheme(themeDelta);
    setSubthemeName(getStoredSubthemeName());
    setSubthemeMode(getStoredSubthemeMode());
  };

  // Listen for print events
  useBeforePrint(
    useCallback(() => {
      toggleItalicsInChrome(false);
    }, []),
  );
  useAfterPrint(
    useCallback(() => {
      toggleItalicsInChrome(true);
    }, []),
  );

  // Expose Debug methods
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Debug = Object.freeze({
      toggleSitemap: () => setSitemapEnabled(!sitemap_enabled),
    });
  }, [sitemap_enabled]);

  // Lazy-load the conditional plugins. These are purely cosmetic and
  // don't affect the functionality of the page.
  useEffect(() => {
    import('../conditional_plugins/conditional_plugins').then(
      ({ executePlugins }) => {
        executePlugins({
          is_small_screen,
          sidebar_shown,
          settings_shown,
          subtheme_name,
          subtheme_mode: normalizeSubthemeMode(subtheme_mode),
        });
      },
    );
  }, [
    is_small_screen,
    sidebar_shown,
    settings_shown,
    subtheme_name,
    subtheme_mode,
  ]);

  const sidebar = Config.DISABLE_SIDEBAR ? null : (
    <Sidebar
      contentNodeSelector={`#${Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}`}
      isSmallScreen={is_small_screen}
      sidebarShown={sidebar_shown}
      settingsShown={settings_shown}
      activeSectionOffsetY={active_section_offset_y}
      sitemapEnabled={sitemap_enabled}
      onToggleSidebar={toggleSidebarShown}
      onToggleSettings={toggleSettingsShown}
    />
  );

  return (
    <Fragment>
      <Topbar
        isSmallScreen={is_small_screen}
        showSidebarToggle={!Config.DISABLE_SIDEBAR}
        showSettingsToggle={true}
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        onActiveSectionOffsetChange={setActiveSectionOffsetY}
        onToggleSidebar={toggleSidebarShown}
        onToggleSettings={toggleSettingsShown}
      />
      <MainContent
        innerHTML={props.contentHTML}
        visible={main_content_visible}
        // Only attempt to restore scroll-state if the main content is visible
        scrollToPosition={main_content_visible ? mainElScrollPosition : null}
        isSmallScreen={is_small_screen}
        sidebarShown={sidebar_shown}
        currentSubthemeName={subtheme_name}
        currentSubthemeMode={subtheme_mode}
      />
      {sidebar}
      <Settings
        isSmallScreen={is_small_screen}
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        currentSubthemeName={subtheme_name}
        currentSubthemeMode={subtheme_mode}
        onSubthemeNameChange={(name) => setTheme({ name })}
        onSubthemeModeChange={(mode) => setTheme({ mode })}
      />
    </Fragment>
  );
}

/**
 * HACK: Toggles italics in Chrome before printing.
 * (See issue eecs485staff/primer-spec#38)
 * @param isItalicsEnabled boolean indicating whether italics should be enabled
 */
function toggleItalicsInChrome(enableItalics: boolean) {
  const chromeVersion = getChromeVersion();
  if (chromeVersion === false || chromeVersion >= 82) {
    return;
  }

  const all_italic_els =
    'em, dfn, .text-italic, dt, .highlight .cm, .highlight .c1, ' +
    '.highlight .cs, .highlight .cd, .highlight .ge, .primer-spec-toc-h4';
  const font_style = enableItalics ? 'italic' : 'inherit';

  const nodes: NodeListOf<HTMLElement> = document.querySelectorAll(
    all_italic_els,
  );
  Array.from(nodes).map((el) => {
    el.style.fontStyle = font_style;
  });
}
