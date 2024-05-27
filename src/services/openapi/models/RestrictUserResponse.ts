/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { User } from './User';

export type RestrictUserResponse = {
  err?: boolean;
  msg?: string;
  data?: User;
  details?: any;
};
