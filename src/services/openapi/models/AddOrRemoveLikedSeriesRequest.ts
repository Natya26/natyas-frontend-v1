import { Series } from './Series';

export type AddOrRemoveLikedSeriesRequest = { series_id?: number };
export type AddOrRemoveActions = 'ADD' | 'REMOVE';
export type AddOrRemoveList = Series;
