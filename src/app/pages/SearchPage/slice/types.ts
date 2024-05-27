import { Series } from 'services/openapi/models/Series';

/* --- STATE --- */
export interface ManageSearchPageState {
  allSeriesList?: Series[];
  selectedGenre?:string
}
