import { RootState } from 'types';

export const selectNotificationList = (state: RootState) => state.manageNotification?.notificationList
