import createStore from 'redux-zero';
import Config from './Config';
import Utilities from './Utilities';

export type SubthemeModeSelectorType = 'light' | 'dark' | 'system';

export type StoreStateType = {
  settingsShown: boolean;
  sidebarShown: boolean;
  topbarHeight: number;
  currentSubthemeName: string | null;
  currentSubthemeMode: SubthemeModeSelectorType | null;
};

export default createStore<StoreStateType>({
  settingsShown: false,
  sidebarShown: !Config.HIDE_SIDEBAR_ON_LOAD && !Utilities.isSmallScreen(),
  topbarHeight: 10,
  currentSubthemeName: 'default',
  currentSubthemeMode: 'system',
});
