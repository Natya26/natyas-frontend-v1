import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { request as _request } from '../../../utils/request';
import { GetSearchListResponse } from '../models/GetSearchListResponse';

export class SearchApiService {
  /**
   * API to get Series Data
   * @param seriesName
   * @returns Series Data Success
   * @throws ApiError
   */
  public static getMediaSearchList(
    seriesName?: string,
  ): CancelablePromise<GetSearchListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `media/search/${seriesName}`,
    });
  }
}
