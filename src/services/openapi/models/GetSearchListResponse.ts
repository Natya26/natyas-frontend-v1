/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Series } from './Series';
export type ItemType = {
  id?: string;
  name?: string;
};

export type GetSearchListResponse = {
  err?: boolean;
  msg?: string | null;
  data?: {
    items?: ItemType[];
    series?: Series;
  };
  details: any;
};
