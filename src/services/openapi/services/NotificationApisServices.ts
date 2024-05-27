/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { GetNotificationResponse } from "../models/GetNotificationResponse";
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';


export class NotificationApiService {
    public static getNotificationList(
        page?: number,
        pageLength?: number,
        order?: string,
        userId?:string,
    ): CancelablePromise<GetNotificationResponse> {
      return __request(OpenAPI, {
        method: 'GET',
        url: `/notifications`,
        query: {page,pageLength,order,userId},
      });
    }
}