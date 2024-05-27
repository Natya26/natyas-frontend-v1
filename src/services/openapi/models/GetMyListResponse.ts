/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Series } from './Series';

export type GetMyListResponse = {
  err?: boolean;
  msg?: string | null;
  data?: Series[];
  details: any;
};
