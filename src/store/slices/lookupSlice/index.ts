import { PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'services/openapi/models/Category';
import { Genre } from 'services/openapi/models/Genre';
import { Language } from 'services/openapi/models/Language';
import { VideoMetaData } from 'services/openapi/models/VideoMetaData';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { LookupState } from './types';

export const initialState: LookupState = {
  categories: [],
  genres: [],
  languages: [],
  trailers: [],
};

const slice = createSlice({
  name: 'lookup',
  initialState,
  reducers: {
    addCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload ?? [];
    },
    addGenres(state, action: PayloadAction<Genre[]>) {
      state.genres = action.payload ?? [];
    },
    addLanguages(state, action: PayloadAction<Language[]>) {
      state.languages = action.payload ?? [];
    },
    addTrailers(state, action: PayloadAction<VideoMetaData[]>) {
      state.trailers = action.payload ?? [];
    },
  },
});

export const { actions: lookupActions } = slice;

export const useLookupSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
