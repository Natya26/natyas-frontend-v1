import { RootState } from 'types';

export const selectCategories = (state: RootState) => state.lookup?.categories;

export const selectGenres = (state: RootState) => state.lookup?.genres;

export const selectLanguages = (state: RootState) => state.lookup?.languages;

export const selectTrailers = (state: RootState) => state.lookup?.trailers;
