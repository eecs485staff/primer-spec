import createStore from 'redux-zero';
import Config from './Config';

export type StoreStateType = {
  settingsShown: boolean;
  sidebarShown: boolean;
  topbarHeight: number;
};

export default createStore({
  settingsShown: false,
  sidebarShown: !Config.HIDE_SIDEBAR_ON_LOAD,
  topbarHeight: 10,
});
