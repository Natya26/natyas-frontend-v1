/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { User } from './User';

export type SocialLoginResponse = {
  err?: boolean;
  msg?: string;
  data?: {
    accessToken?: string | null;
    idToken?: string | null;
    refreshToken?: string | null;
    user?: User;
  } | null;
  details?: any;
};
