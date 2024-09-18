/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { User } from './User';

export type OTPLessSignUpResponse = {
  err?: boolean;
  msg?: string;
  data?: {
    message?: 'Signup Success';
    result?: {
      indhriyaUser?: User;
    };
  };
  details?: any;
};
