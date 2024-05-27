/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Series } from './Series';
import { VideoMetaData } from './VideoMetaData';

// import { User } from "./User";

export type ItemType = {
  id?: string;
  name?: string;
};
export type HomePageResponse = {
  err?: boolean;
  msg?: string | null;
  data?: {
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
  details: any;
};
