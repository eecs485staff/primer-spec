import { StoreStateType } from './store';

export default () => ({
  toggleSettingsShown: ({ settingsShown }: StoreStateType) => ({
    settingsShown: !settingsShown,
  }),
  toggleSidebarShown: ({ sidebarShown }: StoreStateType) => ({
    sidebarShown: !sidebarShown,
  }),
  setTopbarHeight: (_: StoreStateType, topbarHeight: number) => ({
    topbarHeight,
  }),
});
