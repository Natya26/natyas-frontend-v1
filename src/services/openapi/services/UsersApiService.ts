import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { GetAllUsersListResponse } from '../models/GetAllUsersListResponse';
import { GetUserResponse } from '../models/GetUserResponse';
import { RestrictUserRequest } from '../models/RestrictUserRequest';
import { RestrictUserResponse } from '../models/RestrictUserResponse';

export class UsersApiService {
  /**
   * API to List users
   * @param page
   * @param page_length
   * @param order
   * @returns user list Data Success
   * @throws ApiError
   */
  public static getAllUsersList(
    page?: number,
    page_length?: number,
    order?: string,
  ): CancelablePromise<GetAllUsersListResponse> {
    const query = { page, page_length, order };
    return __request(OpenAPI, {
      method: 'GET',
      url: `/users`,
      query,
    });
  }

  /**
   * API to user Data
   * @param videoId
   * @returns user Data Success
   * @throws ApiError
   */
  public static getUserDetails(
    user_id?: string,
  ): CancelablePromise<GetUserResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/users/${user_id}`,
    });
  }

  /**
   * API to user Data
   * @param videoId
   * @returns user Data Success
   * @throws ApiError
   */
  public static restrictUser(
    user_id?: string,
    requestBody?: RestrictUserRequest,
  ): CancelablePromise<RestrictUserResponse> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: `/users/${user_id}/restrict`,
      body: requestBody,
    });
  }
}
