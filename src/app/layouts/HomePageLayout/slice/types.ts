import { Session } from 'services/mavapi/session';

/* --- STATE --- */
export interface ManageUserDetailsState {
  userDetails?: {
    userName?: string;
    userEmail?: string;
    userPhoto?: string;
  };
}
