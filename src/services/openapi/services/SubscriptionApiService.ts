/* istanbul ignore file */
/* tslint:disable */

import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { ArrOrEditSubscriptionPlanRequest } from '../models/AddOrEditSubscriptionPlanRequest';
import { CreateSubscriptionPlanResponse } from '../models/CreateSubscriptionPlanResponse';
import { DeleteSubscriptionPlanResponse } from '../models/DeleteSubscriptionPlanResponse';

import { GetSubscriptionPlanListResponse } from '../models/GetSubscriptionPlanListResponse';
import { GetSubscriptionPlanResponse } from '../models/GetSubscriptionPlanResponse';

/* eslint-disable */
export class SubscriptionApiService {
  /**
   * API to get SubscriptionPlan List
   * @param page
   * @param pageLength
   * @param order
   * @returns SubscriptionPlan List Success
   * @throws ApiError
   */
  public static getSubscriptionList(
    page?: number,
    pageLength?: number,
    order?: string,
  ): CancelablePromise<GetSubscriptionPlanListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/subscriptions/plans',
      query: { page, order, page_length: pageLength },
    });
  }

  /**
   * API to create SubscriptionPlan
   * @param requestBody
   * @returns SubscriptionPlan Data Success
   * @throws ApiError
   */
  public static createSubscription(
    requestBody?: ArrOrEditSubscriptionPlanRequest,
  ): CancelablePromise<CreateSubscriptionPlanResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/subscription-plans',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to Update SubscriptionPlan
   * @param seriesId
   * @param requestBody
   * @returns SubscriptionPlan Data Success
   * @throws ApiError
   */
  public static updateSubscriptionPlan(
    plan_id?: number,
    requestBody?: ArrOrEditSubscriptionPlanRequest,
  ): CancelablePromise<CreateSubscriptionPlanResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: `/subscription-plans/${plan_id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to get SubscriptionPlan Data
   * @param seriesId
   * @returns SubscriptionPlan Data Success
   * @throws ApiError
   */
  public static getSubscriptionPlan(
    plan_id?: number,
  ): CancelablePromise<GetSubscriptionPlanResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/subscription-plans/${plan_id}`,
    });
  }
  /**
   * API to get SubscriptionPlan Data
   * @param seriesId
   * @returns SubscriptionPlan Data Success
   * @throws ApiError
   */
  public static getUserSubscriptionPlan(): CancelablePromise<GetSubscriptionPlanResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/user/subscription`,
    });
  }

  /**
   * API to delete SubscriptionPlan
   * @param seriesId
   * @returns  Success
   * @throws ApiError
   */
  public static deleteSubscriptionPlan(
    plan_id?: number,
  ): CancelablePromise<DeleteSubscriptionPlanResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: `/subscription-plans/${plan_id}`,
    });
  }
}
