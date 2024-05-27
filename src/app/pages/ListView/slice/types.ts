import { Series } from "services/openapi/models/Series";


/* --- STATE --- */
export interface ManageListViewState {
  listViewList?: Series[];
  listHeaderName?:string;
}
