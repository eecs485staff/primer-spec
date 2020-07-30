import createStore from 'redux-zero';
import Config from './Config';

export type StoreStateType = {
  sidebarShown: boolean;
  topbarHeight: number;
};

export default createStore({ sidebarShown: !Config.HIDE_SIDEBAR_ON_LOAD });
