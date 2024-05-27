import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import {
  AddOrRemoveActions,
  AddOrRemoveMyListRequest,
} from '../models/AddOrRemoveMyListRequest';
import { AddOrRemoveMyListResponse } from '../models/AddOrRemoveMyListResponse';
import { ComingSoonResponse } from '../models/ComingSoonResponse';
import { GetMyListResponse } from '../models/GetMyListResponse';
import { HomePageResponse } from '../models/HomePageResponse';
import { NewAndHotResponse } from '../models/NewAndHotResponse';

export class HomeApiService {
  /**
   * API to List homepage
   * @param page
   * @param page_length
   * @param order
   * @returns homepage list Data Success
   * @throws ApiError
   */
  public static getHomePageList(
    lang?: string,
  ): CancelablePromise<HomePageResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/homescreen`,
      query: { lang },
    });
  }

  /**
   * API to Get My List
   * @param page
   * @param page_length
   * @param order
   * @returns mylist Data Success
   * @throws ApiError
   */
  public static getMyList(lang?: string): CancelablePromise<GetMyListResponse> {
    const query = { lang };
    return __request(OpenAPI, {
      method: 'GET',
      url: `/app/my-list`,
      query,
    });
  }

  /**
   * API to Get New-n-Hot List
   * @param page
   * @param page_length
   * @param order
   * @returns mylist Data Success
   * @throws ApiError
   */
  public static getNewAndHotList(
    lang?: string,
  ): CancelablePromise<NewAndHotResponse> {
    const query = { lang };
    return __request(OpenAPI, {
      method: 'GET',
      url: `/new-n-hot`,
      query,
    });
  }
  /**
   * API to Get Coming soon List
   * @param page
   * @param page_length
   * @param order
   * @returns Coming soon Success
   * @throws ApiError
   */
  public static getComingSoonList(
    lang?: string,
  ): CancelablePromise<ComingSoonResponse> {
    const query = { lang };
    return __request(OpenAPI, {
      method: 'GET',
      url: `/app/coming-soon`,
      query,
    });
  }
  /**
   * API to Add or remove My List
   * @param page
   * @param page_length
   * @param order
   * @returns
   * @throws ApiError
   */
  public static addOrRemoveMyList(
    requestBody?: AddOrRemoveMyListRequest,
    action?: AddOrRemoveActions,
  ): CancelablePromise<AddOrRemoveMyListResponse> {
    const query = { action };
    return __request(OpenAPI, {
      method: 'POST',
      url: `/app/my-list`,
      body: requestBody,
      query,
    });
  }
}
