import { RootState } from 'types';

export const selectUserName = (state: RootState) =>
  state.manageUserDetails?.userDetails?.userName;
export const selectUserEmail = (state: RootState) =>
  state.manageUserDetails?.userDetails?.userEmail;
export const selectUserphoto = (state: RootState) =>
  state.manageUserDetails?.userDetails?.userPhoto;
