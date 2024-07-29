import { PayloadAction } from '@reduxjs/toolkit';
import { Cast } from 'services/openapi/models/Cast';
import { Genre } from 'services/openapi/models/Genre';
import { ItemType } from 'services/openapi/models/HomePageResponse';
import { Language } from 'services/openapi/models/Language';
import { Series } from 'services/openapi/models/Series';
import { VideoMetaData } from 'services/openapi/models/VideoMetaData';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageHomeState } from './types';
import { AddOrRemoveList } from 'services/openapi/models/AddOrRemoveMyListRequest';
import { HomePageRequest } from 'services/openapi/models/HomePageRequest';

export const initialState: ManageHomeState = {
  allHomeList: {
    items: [],
    featured: undefined,
    continueWatching: [],
    recommended: [],
    trailers: [],
    latestSeries: [],
    allSeries: [],
    malayalam: [],
    tamil: [],
    hindi: [],
    telugu: [],
    kannada: [],
  },
  getMyList: [],
  getNewAndHotList: { items: [], series: [] },
  getComingSoonList: [],
  addOrRemoveMyList: {
    id: 0,
    name: '',
    description: '',
    poster: '',
    release_date: '',
    active: false,
    created_at: '',
    updated_at: '',
    featured: false,
    coming_soon: false,
    director: '',
    casts: [],
    season_count: 0,
    episode_count: 0,
    genres: [],
    languages: [],
    trailers: [],
    seasons: [],
    isInMyList: false,
    isLiked: false,
    likes: 0,
  },
  currentSeries: undefined,
  fetchChanges: false,
  carouselIsMoving: false,
};

const slice = createSlice({
  name: 'manageHome',
  initialState,
  reducers: {
    setAllHomeList(state, action: PayloadAction<HomePageRequest>) {
      if (state.allHomeList) {
        state.allHomeList = action.payload;
      }
    },
    setUpItems(state, action: PayloadAction<ItemType[]>) {
      if (state.allHomeList) {
        state.allHomeList.items = action.payload;
      }
    },
    setUpfeatured(state, action: PayloadAction<Series>) {
      if (state.allHomeList) {
        state.allHomeList.featured = action.payload;
      }
    },
    setContinueWatching(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.continueWatching = action.payload;
      }
    },
    setRecommended(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.recommended = action.payload;
      }
    },
    setTrailers(state, action: PayloadAction<VideoMetaData[]>) {
      if (state.allHomeList) {
        state.allHomeList.trailers = action.payload;
      }
    },
    setLatestSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.latestSeries = action.payload;
      }
    },
    setAllSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.allSeries = action.payload;
      }
    },
    setMalayalamSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.malayalam = action.payload;
      }
    },
    setTamilSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.tamil = action.payload;
      }
    },
    setHindiSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.hindi = action.payload;
      }
    },
    setTeluguSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.telugu = action.payload;
      }
    },
    setKannadaSeries(state, action: PayloadAction<Series[]>) {
      if (state.allHomeList) {
        state.allHomeList.kannada = action.payload;
      }
    },
    setGetMyList(state, action: PayloadAction<Series[]>) {
      if (state.getMyList) {
        state.getMyList = action.payload;
      }
    },
    setNewAndHotItems(state, action: PayloadAction<ItemType[]>) {
      if (state.getNewAndHotList) {
        state.getNewAndHotList.items = action.payload;
      }
    },
    setNewAndHotList(state, action: PayloadAction<Series[]>) {
      if (state.getNewAndHotList) {
        state.getNewAndHotList.series = action.payload;
      }
    },
    setComingSoonList(state, action: PayloadAction<Series[]>) {
      if (state.getComingSoonList) {
        state.getComingSoonList = action.payload;
      }
    },
    setAddOrRemoveMyList(state, action: PayloadAction<AddOrRemoveList>) {
      if (state.addOrRemoveMyList) {
        state.addOrRemoveMyList = action.payload;
      }
    },
    setCurrentSeries(state, action: PayloadAction<Series>) {
      state.currentSeries = action.payload;
    },
    setFetchChanges(state, action: PayloadAction<boolean>) {
      state.fetchChanges = action.payload;
    },
    setCarouselIsMoving(state, action: PayloadAction<boolean>) {
      state.carouselIsMoving = action.payload;
    },
  },
});

export const { actions: manageHomeActions } = slice;

export const useManageHomeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
