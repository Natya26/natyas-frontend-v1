import { User } from './User';

export type GetUserResponse = {
  err?: boolean;
  msg?: string;
  data?: {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    user?: User;
    passwordChangeStatus?: boolean;
  };
  details?: any;
};
