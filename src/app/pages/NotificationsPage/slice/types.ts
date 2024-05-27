import { NotificationItem } from 'services/openapi/models/GetNotificationResponse';

/* --- STATE --- */
export interface ManageNotificationState {
  notificationList?:NotificationItem[]
}
