import { PayloadAction } from '@reduxjs/toolkit';
import { Series } from 'services/openapi/models/Series';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageIndividualViewState } from './types';

export const initialState: ManageIndividualViewState = {
  getSeries: {},
  getSimilarSeries: [],
  addOrRemoveLikedSeries: {},
  storeId: {},
};

const slice = createSlice({
  name: 'manageIndividualView',
  initialState,
  reducers: {
    setSeries(state, action: PayloadAction<Series>) {
      if (state.getSeries) {
        state.getSeries = action.payload;
      }
    },
    setSimilarSeries(state, action: PayloadAction<Series[]>) {
      if (state.getSimilarSeries) {
        state.getSimilarSeries = action.payload;
      }
    },
    setAddOrRemoveLikedSeries(state, action: PayloadAction<Series>) {
      if (state.addOrRemoveLikedSeries) {
        state.addOrRemoveLikedSeries = action.payload;
      }
    },
    setStoreId(state, action: PayloadAction<{}>) {
      if (state.storeId) {
        state.storeId = action.payload;
      }
    },
  },
});

export const { actions: manageIndividualViewActions } = slice;

export const useIndividualViewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
