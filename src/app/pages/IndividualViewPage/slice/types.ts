import { Series } from 'services/openapi/models/Series';

/* --- STATE --- */
export interface ManageIndividualViewState {
  getSeries?: Series;
  getSimilarSeries?: Series[];
  addOrRemoveLikedSeries?: Series;
  storeId: { series_id?: number };
}
