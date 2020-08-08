import createStore from 'redux-zero';
import Config from './Config';
import Utilities from './Utilities';

export type StoreStateType = {
  settingsShown: boolean;
  sidebarShown: boolean;
  topbarHeight: number;
  currentSubthemeName: string;
  currentSubthemeMode: SubthemeModeSelectorType;
  isSmallScreen: boolean;
};

export default createStore<StoreStateType>({
  settingsShown: false,
  sidebarShown: !Config.HIDE_SIDEBAR_ON_LOAD && !Utilities.isSmallScreen(),
  topbarHeight: 10,
  currentSubthemeName: Config.DEFAULT_SUBTHEME_NAME,
  currentSubthemeMode: Config.DEFAULT_SUBTHEME_MODE,
  isSmallScreen: Utilities.isSmallScreen(),
});
