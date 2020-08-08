import { h, Fragment } from 'preact';
import { useEffect, useLayoutEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import Config from './Config';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/Topbar';
import Settings from './components/Settings';
import Utilities from './Utilities';
import { updateTheme } from './SubthemeSettings';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from './actions';
import { StoreStateType } from './store';

function PrimerSpec(
  props: StoreStateType & BoundActions<StoreStateType, typeof actions>,
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
      const isSmallScreen = Utilities.isSmallScreen();
      if (isSmallScreen !== props.isSmallScreen) {
        props.setIsSmallScreen(isSmallScreen);
      }
    };

    window.addEventListener('resize', window_resize_listener);
    return () => {
      window.removeEventListener('resize', window_resize_listener);
    };
  }, [props.isSmallScreen]);

  return (
    <Fragment>
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

export default connect(null, actions)(PrimerSpec);
