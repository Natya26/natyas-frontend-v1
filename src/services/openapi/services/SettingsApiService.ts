/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { request as _request } from '../../../utils/request';
import { GetUserResponse } from '../models/GetUserResponse';
import { ModifyUserPayLoad } from '../models/ModifyUserPayLoad';

export class SettingsApiService {
  /**
   * API to get Profile data
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static getCurrentUser(): CancelablePromise<GetUserResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: 'current-user',
      mediaType: 'application/json',
    });
  }
  /**
   * API to Update Profile data
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static updateCurrentUser(
    requestBody?: ModifyUserPayLoad,
  ): CancelablePromise<GetUserResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/update',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
