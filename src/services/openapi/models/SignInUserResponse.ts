/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { User } from './User';

export type SignInUserResponse = {
  err?: boolean;
  msg?: string;
  data?: {
    message?: 'Signup Success';
    result?: {
      navarasaUser?: User;
    };
  };
  details?: any;
};
