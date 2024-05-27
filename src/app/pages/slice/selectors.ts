import { RootState } from 'types';

export const selectSession = (state: RootState) => state.manageApp?.session;
export const selectIsAuthenticated = (state: RootState) =>
  state.manageApp?.session?.isAuthenticated;
export const selectRedirectPath = (state: RootState) =>
  state.manageApp?.session?.redirectPath;
export const selectPageLoader = (state: RootState) =>
  state.manageApp?.pageLoader;
