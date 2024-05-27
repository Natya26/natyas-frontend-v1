import { RootState } from 'types';

export const selectVideoUrl = (state: RootState) =>
  state.managePlayVideo?.videoUrl;
export const selectThumbnail = (state: RootState) =>
  state.managePlayVideo?.thumbnail;
export const selectCurrentlyWatching = (state: RootState) =>
  state.managePlayVideo?.currentlyWatching;
