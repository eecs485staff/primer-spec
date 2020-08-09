import { h, Fragment } from 'preact';
import { useState, useEffect, useLayoutEffect } from 'preact/hooks';
import Config from '../Config';
import Sidebar from './sidebar/Sidebar';
import Topbar from './Topbar';
import Settings from './Settings';
import MainContent from './MainContent';
import isSmallScreen from '../utils/isSmallScreen';
import getChromeVersion from '../utils/getChromeVersion';
import { updateTheme } from '../subthemes';
import { useBeforePrint, useAfterPrint } from '../utils/printHandlerHooks';

type PropsType = { contentHTML: string };

export default function PrimerSpec(props: PropsType) {
  const [is_small_screen, setIsSmallScreen] = useState(isSmallScreen());
  const [sidebar_shown, setSidebarShown] = useState(
    !Config.HIDE_SIDEBAR_ON_LOAD && !is_small_screen,
  );
  const [settings_shown, setSettingsShown] = useState(false);
  const [topbar_height, setTopbarHeight] = useState(10);
  const [subtheme_name, setSubthemeName] = useState(Config.INIT_SUBTHEME_NAME);
  const [subtheme_mode, setSubthemeMode] = useState(Config.INIT_SUBTHEME_MODE);

  const toggleSidebarShown = () => setSidebarShown(!sidebar_shown);
  const toggleSettingsShown = () => setSettingsShown(!settings_shown);
  const setSubtheme = ({ name, mode }: SubthemeType) => {
    setSubthemeName(name);
    setSubthemeMode(mode);
  };

  // Listen for changes to system theme (light/dark mode)
  useEffect(() => {
    const system_theme_change_listener = () => updateTheme({}, () => {});
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(system_theme_change_listener);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeListener(system_theme_change_listener);
    };
  }, []);

  // Listen for changes to the window size.
  useLayoutEffect(() => {
    const window_resize_listener = () => {
      const isCurrentlySmallScreen = isSmallScreen();
      if (isCurrentlySmallScreen !== is_small_screen) {
        setIsSmallScreen(isCurrentlySmallScreen);
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

  return (
    <Fragment>
      <MainContent
        innerHTML={props.contentHTML}
        sidebarShown={sidebar_shown}
        isSmallScreen={is_small_screen}
      />
      <Sidebar
        contentNodeSelector={`#${Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}`}
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        topbarHeight={topbar_height}
        isSmallScreen={is_small_screen}
        onToggleSidebar={toggleSidebarShown}
        onToggleSettings={toggleSettingsShown}
      />
      <Topbar
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        isSmallScreen={is_small_screen}
        onTopbarHeightChange={setTopbarHeight}
        onClickToggleSidebar={toggleSidebarShown}
        onClickToggleSettings={toggleSettingsShown}
      />
      <Settings
        currentSubthemeName={subtheme_name}
        currentSubthemeMode={subtheme_mode}
        sidebarShown={sidebar_shown}
        settingsShown={settings_shown}
        isSmallScreen={is_small_screen}
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
