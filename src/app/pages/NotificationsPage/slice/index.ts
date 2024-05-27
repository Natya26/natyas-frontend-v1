import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageNotificationState } from './types';
import { RoutePath } from 'app/RoutePath';
import { NotificationItem } from 'services/openapi/models/GetNotificationResponse';

export const initialState: ManageNotificationState = {
  notificationList:[]
};

const slice = createSlice({
  name: 'manageNotification',
  initialState,
  reducers: {
    setNotificationList(state, action: PayloadAction<NotificationItem[]>) {
        state.notificationList = action.payload;
      
    },
  },
});

export const { actions: manageNotificationActions } = slice;

export const useManageNotificationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
