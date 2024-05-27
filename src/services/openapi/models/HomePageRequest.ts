/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Series } from './Series';
import { VideoMetaData } from './VideoMetaData';

export type ItemType = {
  id?: string;
  string?: string;
};

export type HomePageRequest = {
  items?: ItemType[];
  featured?: Series;
  continueWatching?: Series[];
  recommended?: Series[];
  trailers?: VideoMetaData[];
  latestSeries?: Series[];
  allSeries?: Series[];
  malayalam?: Series[];
  tamil?: Series[];
  hindi?: Series[];
  telugu?: Series[];
  kannada?: Series[];
};
