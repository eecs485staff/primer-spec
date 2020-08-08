import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
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
  useEffect(() => {
    // Listen for changes to system theme (light/dark mode)
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

  return (
    <Fragment>
      <Sidebar
        contentNodeSelector="#primer-spec-plugin-main-content"
        sidebarShown={props.sidebarShown}
        topbarHeight={props.topbarHeight}
        onClickToggleSidebar={props.toggleSidebarShown}
      />
      <Topbar
        sidebarShown={props.sidebarShown}
        settingsShown={props.settingsShown}
        onTopbarHeightChange={props.setTopbarHeight}
        onClickToggleSidebar={props.toggleSidebarShown}
        onClickToggleSettings={props.toggleSettingsShown}
      />
      <Settings
        currentSubthemeName={props.currentSubthemeName}
        currentSubthemeMode={props.currentSubthemeMode}
        settingsShown={props.settingsShown}
        onSubthemeNameChange={props.setSubthemeName}
        onSubthemeModeChange={props.setSubthemeMode}
      />
    </Fragment>
  );
}

export default connect(null, actions)(PrimerSpec);
