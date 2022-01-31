import { Fragment, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import {
  getStoredSubthemeMode,
  getStoredSubthemeName,
  updateTheme,
} from '../subthemes';
import getChromeVersion from '../utils/getChromeVersion';
import { useAfterPrint, useBeforePrint } from '../utils/hooks/print';
import useSmallScreen from '../utils/hooks/useSmallScreen';
import Config from '../Config';
import { DiffBanner } from './diff/DiffBanner';
import MainContent from './main_content';
import Settings from './settings';
import Sidebar from './sidebar';
import Topbar from './Topbar';
import Storage from '../utils/Storage';

type PropsType = { contentHTML: string };

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
  const [active_section_offsets_y, setActiveSectionOffsetsY] = useState({
    banner: Config.DEFAULT_ACTIVE_SECTION_OFFSET_Y,
    topbar: Config.DEFAULT_ACTIVE_SECTION_OFFSET_Y,
  });
  const [subtheme_name, setSubthemeName] = useState(Config.INIT_SUBTHEME_NAME);
  const [subtheme_mode, setSubthemeMode] = useState(Config.INIT_SUBTHEME_MODE);
  const [sitemap_enabled, setSitemapEnabled] = useState(
    Config.INIT_SITEMAP_ENABLED,
  );

  const totalOffsetY =
    active_section_offsets_y.banner + active_section_offsets_y.topbar;

  // Define derived methods to manipulate state
  const toggleSidebarShown = () => {
    Storage.setForPage('sidebar_hidden', sidebar_shown.toString());
    setSidebarShown(!sidebar_shown);
  };
  const toggleSettingsShown = () => setSettingsShown(!settings_shown);
  const setTheme = (themeDelta: Partial<SubthemeSelectionType>) => {
    updateTheme(themeDelta);
    setSubthemeName(getStoredSubthemeName());
    setSubthemeMode(getStoredSubthemeMode());
  };

  // Listen for print events
  const beforePrint = useCallback(useBeforePrint, []);
  const afterPrint = useCallback(useAfterPrint, []);
  useEffect(() => {
    return beforePrint(() => {
      toggleItalicsInChrome(false);
    });
  }, [beforePrint]);
  useEffect(() => {
    return afterPrint(() => {
      toggleItalicsInChrome(true);
    });
  }, [afterPrint]);

  // Expose Debug methods
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Debug = Object.freeze({
      toggleSitemap: () => setSitemapEnabled(!sitemap_enabled),
    });
  }, [sitemap_enabled]);

  const sidebar = Config.DISABLE_SIDEBAR ? null : (
    <Sidebar
      contentNodeSelector={`#${Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}`}
      isSmallScreen={is_small_screen}
      sidebarShown={sidebar_shown}
      settingsShown={settings_shown}
      activeSectionOffsetY={totalOffsetY}
      sitemapEnabled={sitemap_enabled}
      onToggleSidebar={toggleSidebarShown}
      onToggleSettings={toggleSettingsShown}
    />
  );

  return (
    <Fragment>
      <DiffBanner
        specHTML={props.contentHTML}
        onOffsetChange={(offset) =>
          setActiveSectionOffsetsY({
            ...active_section_offsets_y,
            banner: offset,
          })
        }
      />
      <Topbar
        isSmallScreen={is_small_screen}
        showSidebarToggle={!Config.DISABLE_SIDEBAR}
        showSettingsToggle={true}
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        onActiveSectionOffsetChange={(offset) =>
          setActiveSectionOffsetsY({
            ...active_section_offsets_y,
            topbar: offset,
          })
        }
        onToggleSidebar={toggleSidebarShown}
        onToggleSettings={toggleSettingsShown}
      />
      <MainContent
        innerHTML={props.contentHTML}
        isSmallScreen={is_small_screen}
        sidebarShown={sidebar_shown}
        currentSubthemeName={subtheme_name}
        currentSubthemeMode={subtheme_mode}
        paddingTop={totalOffsetY}
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
