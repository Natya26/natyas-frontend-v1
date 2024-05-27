/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Cast } from "./Cast";
import { Genre } from "./Genre";
import { Series } from "./Series";
              


export type GetListViewResponse={
    err?: boolean,
    msg?: string,
    data?: {
      allSeries?:Series[];
      recommended?:Series[];

}
details?: any;
}


