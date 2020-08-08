import { StoreStateType } from './store';
import { updateTheme } from './SubthemeSettings';

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

  // Do not directly update the subtheme, they need to go through updateTheme
  // first.
  setSubthemeName: (_: StoreStateType, subthemeName: string) => {
    updateTheme({ name: subthemeName });
    return {};
  },
  setSubthemeMode: (
    _: StoreStateType,
    subthemeMode: SubthemeModeSelectorType,
  ) => {
    updateTheme({ mode: subthemeMode });
    return {};
  },

  setIsSmallScreen: (_: StoreStateType, isSmallScreen: boolean) => ({
    isSmallScreen,
  }),
});
