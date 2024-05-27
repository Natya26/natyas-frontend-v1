import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageUserDetailsState } from './types';

interface UserDetailsPayload {
  userName?: string;
  userEmail?: string;
  userPhoto?: string;
}

export const initialState: ManageUserDetailsState = {
  userDetails: {
    userName: '',
    userEmail: '',
    userPhoto: '',
  },
};

const slice = createSlice({
  name: 'manageUserDetails',
  initialState,
  reducers: {
    setuserDetails(state, action: PayloadAction<UserDetailsPayload>) {
      if (state.userDetails) {
        state.userDetails.userName = action.payload.userName;
        state.userDetails.userEmail = action.payload.userEmail;
        state.userDetails.userPhoto = action.payload.userPhoto;
      }
    },
  },
});

export const { actions: manageUserDetailsActions } = slice;

export const useManageUserDetailsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
