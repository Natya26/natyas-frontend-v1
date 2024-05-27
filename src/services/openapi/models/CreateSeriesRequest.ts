/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Cast } from './Cast';
import { Genre } from './Genre';
import { Language } from './Language';

export type CreateSeriesRequest = {
  name?: string;
  description?: string;
  poster?: string;
  release_date?: string;
  genres?: Genre[];
  featured?: boolean;
  coming_soon?: boolean;
  director?: string;
  casts?: Cast[];
  languages?: Language[];
};
