import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageSearchPageState } from './types';
import { Series } from 'services/openapi/models/Series';

export const initialState: ManageSearchPageState = {
  allSeriesList: [],
};

const slice = createSlice({
  name: 'manageSearchPage',
  initialState,
  reducers: {
    setAllSeriesList(state, action: PayloadAction<Series[]>) {
      state.allSeriesList = action.payload;
    },
  },
});

export const { actions: manageSearchActions } = slice;

export const useManageSearchPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
