import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { RoutePath } from 'app/RoutePath';
import { ManageListViewState } from './types';
import { Series } from 'services/openapi/models/Series';

export const initialState: ManageListViewState = {
  listViewList:[],
  listHeaderName:''
};

const slice = createSlice({
  name: 'manageListView',
  initialState,
  reducers: {
    setListViewList(state, action: PayloadAction<Series[]>) {
        state.listViewList = action.payload;
    },
    setListHeaderName(state, action: PayloadAction<string>) {
      state.listHeaderName = action.payload;
  },
}
});

export const { actions: manageListViewActions } = slice;

export const useManageListViewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
