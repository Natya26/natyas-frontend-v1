import { AddOrRemoveList } from 'services/openapi/models/AddOrRemoveMyListRequest';
import { HomePageRequest } from 'services/openapi/models/HomePageRequest';
import { ItemType } from 'services/openapi/models/NewAndHotResponse';
import { Series } from 'services/openapi/models/Series';

/* --- STATE --- */
export interface ManageHomeState {
  allHomeList?: HomePageRequest;
  getMyList?: Series[];
  getNewAndHotList?: { items?: ItemType[]; series?: Series[] };
  getComingSoonList?: Series[];
  addOrRemoveMyList?: AddOrRemoveList;
  currentSeries?: Series;
  fetchChanges?: boolean;
  carouselIsMoving?: boolean;
}
