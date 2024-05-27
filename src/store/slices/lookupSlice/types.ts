import { Category } from 'services/openapi/models/Category';
import { Genre } from 'services/openapi/models/Genre';
import { Language } from 'services/openapi/models/Language';
import { VideoMetaData } from 'services/openapi/models/VideoMetaData';

/* --- STATE --- */
export interface LookupState {
  genres?: Genre[];
  languages?: Language[];
  categories?: Category[];
  trailers?: VideoMetaData[];
}
