import { Session } from 'services/mavapi/session';

/* --- STATE --- */
export interface ManageAppState {
  session?: Session;
  pageLoader?: boolean;
}
