import { h, Fragment } from 'preact';
import { useEffect, useLayoutEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import Config from '../Config';
import Sidebar from './sidebar/Sidebar';
import Topbar from './Topbar';
import Settings from './Settings';
import MainContent from './MainContent';
import isSmallScreen from '../utils/isSmallScreen';
import getChromeVersion from '../utils/getChromeVersion';
import { updateTheme } from '../subthemes';
import { useBeforePrint, useAfterPrint } from '../utils/printHandlerHooks';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from '../actions';
import { StoreStateType } from '../store';

type PropsType = { contentHTML: string };

function PrimerSpec(
  props: PropsType &
    StoreStateType &
    BoundActions<StoreStateType, typeof actions>,
) {
  // Listen for changes to system theme (light/dark mode)
  useEffect(() => {
    const system_theme_change_listener = () => updateTheme({});
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
      if (isCurrentlySmallScreen !== props.isSmallScreen) {
        props.setIsSmallScreen(isCurrentlySmallScreen);
      }
    };

    window.addEventListener('resize', window_resize_listener);
    return () => {
      window.removeEventListener('resize', window_resize_listener);
    };
  }, [props.isSmallScreen]);

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
        sidebarShown={props.sidebarShown}
        isSmallScreen={props.isSmallScreen}
      />
      <Sidebar
        contentNodeSelector={`#${Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}`}
        sidebarShown={props.sidebarShown}
        settingsShown={props.settingsShown}
        topbarHeight={props.topbarHeight}
        isSmallScreen={props.isSmallScreen}
        onToggleSidebar={props.toggleSidebarShown}
        onToggleSettings={props.toggleSettingsShown}
      />
      <Topbar
        sidebarShown={props.sidebarShown}
        settingsShown={props.settingsShown}
        isSmallScreen={props.isSmallScreen}
        onTopbarHeightChange={props.setTopbarHeight}
        onClickToggleSidebar={props.toggleSidebarShown}
        onClickToggleSettings={props.toggleSettingsShown}
      />
      <Settings
        currentSubthemeName={props.currentSubthemeName}
        currentSubthemeMode={props.currentSubthemeMode}
        sidebarShown={props.sidebarShown}
        settingsShown={props.settingsShown}
        isSmallScreen={props.isSmallScreen}
        onSubthemeNameChange={props.setSubthemeName}
        onSubthemeModeChange={props.setSubthemeMode}
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

export default connect(null, actions)(PrimerSpec);
