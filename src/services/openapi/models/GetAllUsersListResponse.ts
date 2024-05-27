/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { User } from './User';

export type GetAllUsersListResponse = {
  err?: boolean;
  msg?: string;
  data?: {
    total_items: number;
    free_users: number;
    users: User[];
  };
  details?: any;
};
