import { h, Fragment } from 'preact';
import { useState, useLayoutEffect } from 'preact/hooks';
import Config from '../Config';
import MainContent from './MainContent';
import Settings from './Settings';
import Sidebar from './sidebar/Sidebar';
import Topbar from './Topbar';
import isSmallScreen from '../utils/isSmallScreen';
import getChromeVersion from '../utils/getChromeVersion';
import { updateTheme } from '../subthemes';
import { useBeforePrint, useAfterPrint } from '../utils/hooks';

type PropsType = { contentHTML: string };

/**
 * This component encapsulates the JS controlling Primer Spec, including the
 * Sidebar, the Topbar and the Settings pane.
 */
export default function PrimerSpec(props: PropsType) {
  // Initialize all shared state
  const [is_small_screen, setIsSmallScreen] = useState(isSmallScreen());
  const [sidebar_shown, setSidebarShown] = useState(
    !Config.HIDE_SIDEBAR_ON_LOAD && !is_small_screen,
  );
  const [settings_shown, setSettingsShown] = useState(false);
  const [active_section_offset_y, setActiveSectionOffsetY] = useState(
    Config.DEFAULT_ACTIVE_SECTION_OFFSET_Y,
  );
  const [subtheme_name, setSubthemeName] = useState(Config.INIT_SUBTHEME_NAME);
  const [subtheme_mode, setSubthemeMode] = useState(Config.INIT_SUBTHEME_MODE);

  // Define derived methods to manipulate state
  const toggleSidebarShown = () => setSidebarShown(!sidebar_shown);
  const toggleSettingsShown = () => setSettingsShown(!settings_shown);
  const setSubtheme = ({ name, mode }: SubthemeType) => {
    setSubthemeName(name);
    setSubthemeMode(mode);
  };

  // Listen for changes to the window size.
  useLayoutEffect(() => {
    const window_resize_listener = () => {
      const is_window_now_a_small_screen = isSmallScreen();
      if (is_window_now_a_small_screen !== is_small_screen) {
        setIsSmallScreen(is_window_now_a_small_screen);
      }
    };

    window.addEventListener('resize', window_resize_listener);
    return () => {
      window.removeEventListener('resize', window_resize_listener);
    };
  }, [is_small_screen]);

  // Listen for print events
  useBeforePrint(() => {
    toggleItalicsInChrome(false);
  }, []);
  useAfterPrint(() => {
    toggleItalicsInChrome(true);
  }, []);

  const sidebar = Config.DISABLE_SIDEBAR ? null : (
    <Sidebar
      contentNodeSelector={`#${Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}`}
      isSmallScreen={is_small_screen}
      sidebarShown={sidebar_shown}
      settingsShown={settings_shown}
      activeSectionOffsetY={active_section_offset_y}
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
        isSmallScreen={is_small_screen}
        sidebarShown={sidebar_shown}
      />
      {sidebar}
      <Settings
        isSmallScreen={is_small_screen}
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        currentSubthemeName={subtheme_name}
        currentSubthemeMode={subtheme_mode}
        onSubthemeNameChange={(name) => updateTheme({ name }, setSubtheme)}
        onSubthemeModeChange={(mode) => updateTheme({ mode }, setSubtheme)}
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
