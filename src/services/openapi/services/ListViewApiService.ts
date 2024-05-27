/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { GetListViewResponse } from '../models/GetListViewResponse';


export class ListViewApiService {
    public static getListViewList(
      lang?: string,
    ): CancelablePromise<GetListViewResponse> {
      return __request(OpenAPI, {
        method: 'GET',
        url: `/list-view`,
        query: {lang},
      });
    }
}


