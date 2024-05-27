import { RootState } from 'types';

export const selectSeries = (state: RootState) =>
  state?.manageIndividualView?.getSeries;
export const selectSimilarSeries = (state: RootState) =>
  state?.manageIndividualView?.getSimilarSeries;
export const selectAddOrRemoveLikedSeries = (state: RootState) =>
  state?.manageIndividualView?.addOrRemoveLikedSeries;
export const selectStoreId = (state: RootState) =>
  state?.manageIndividualView?.storeId;
