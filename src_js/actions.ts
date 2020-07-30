import { StoreStateType } from './store';

export default () => ({
  toggleSidebarShown: ({ sidebarShown }: StoreStateType) => ({
    sidebarShown: !sidebarShown,
  }),
});
