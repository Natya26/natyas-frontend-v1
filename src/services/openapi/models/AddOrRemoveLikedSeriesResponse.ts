import { Series } from './Series';

export type AddOrRemoveLikedSeriesResponse = {
  err?: boolean;
  msg?: string | null;
  data?: Series;
  details: any;
};
