import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageMyListState } from './types';
import { Series } from 'services/openapi/models/Series';

export const initialState: ManageMyListState = {
  getMyList: [],
};

const slice = createSlice({
  name: 'manageMyList',
  initialState,
  reducers: {
    setMyList(state, action: PayloadAction<Series[]>) {
      state.getMyList = action.payload;
    },
  },
});

export const { actions: manageMyListActions } = slice;

export const useManageMyListSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
