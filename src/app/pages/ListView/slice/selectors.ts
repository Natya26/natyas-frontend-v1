import { RootState } from 'types';

export const selectListViewList = (state: RootState) => state.manageListView?.listViewList;

export const selectListHeaderName = (state: RootState) => state.manageListView?.listHeaderName;