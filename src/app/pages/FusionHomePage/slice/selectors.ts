import { RootState } from 'types';

export const selectAllHomeList = (state: RootState) =>
  state?.manageHome?.allHomeList;
export const selectAllSeries = (state: RootState) =>
  state?.manageHome?.allHomeList?.allSeries;
export const selectContinueWatching = (state: RootState) =>
  state?.manageHome?.allHomeList?.continueWatching;
export const selectFeatured = (state: RootState) =>
  state?.manageHome?.allHomeList?.featured;
export const selectAllHindiSeries = (state: RootState) =>
  state?.manageHome?.allHomeList?.hindi;
export const selectAllItems = (state: RootState) =>
  state?.manageHome?.allHomeList?.items;
export const selectLatestSeries = (state: RootState) =>
  state?.manageHome?.allHomeList?.latestSeries;
export const selectAllMalayalamSeries = (state: RootState) =>
  state?.manageHome?.allHomeList?.malayalam;
export const selectRecommented = (state: RootState) =>
  state?.manageHome?.allHomeList?.recommended;
export const selectAllTamilSeries = (state: RootState) =>
  state?.manageHome?.allHomeList?.tamil;
export const selectAllTrailers = (state: RootState) =>
  state?.manageHome?.allHomeList?.trailers;
export const selectAllMyList = (state: RootState) =>
  state?.manageHome?.getMyList;
export const selectNewAndHotItems = (state: RootState) =>
  state?.manageHome?.getNewAndHotList?.items;
export const selectNewAndHotList = (state: RootState) =>
  state?.manageHome?.getNewAndHotList?.series;
export const selectComingSoonList = (state: RootState) =>
  state?.manageHome?.getComingSoonList;
export const selectAddOrRemoveMyList = (state: RootState) =>
  state?.manageHome?.addOrRemoveMyList;
export const selectCurrentSeries = (state: RootState) =>
  state?.manageHome?.currentSeries;
export const selectFetchChanges = (state: RootState) =>
  state?.manageHome?.fetchChanges;
export const selectCarouselIsMoving = (state: RootState) =>
  state?.manageHome?.carouselIsMoving;
