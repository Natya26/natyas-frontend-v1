import { RootState } from 'types';

export const selectAllSeriesList = (state: RootState) =>
  state.manageSearchPage?.allSeriesList;
