import { RootState } from 'types';

export const selectMyList = (state: RootState) => state.manageMyList?.getMyList;
