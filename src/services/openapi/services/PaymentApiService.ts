/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { GenerateChecksumResponse } from '../models/GenerateChecksumResponse';
import { PaymentIntendRequest } from '../models/PaymentIntendRequest';
import { PaymentIntendResponse } from '../models/PaymentIntendResponse';
import { PaymentUpdateRequest } from '../models/PaymentUpdateRequest';
import { checkCustomerVpaRequest } from '../models/checkCustomerVpaRequest';
import { checkCustomerVpaResponse } from '../models/checkCustomerVpaResponse';
import { initiateUpiWebCollectRequest } from '../models/initiateUpiWebCollectRequest';
import { initiateUpiWebCollectResponse } from '../models/initiateUpiWebCollectResponse';

export class PaymentApiService {
  /**
   * API to get PaymentIntend
   * @param name
   * @returns PaymentIntend Data Success
   * @throws ApiError
   */
  public static getPaymentIntend(
    requestBody?: PaymentIntendRequest,
  ): CancelablePromise<PaymentIntendResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/payments',
      body: requestBody,
    });
  }
  /**
   * API to Update Payment
   * @param name
   * @returns Update Payment Success
   * @throws ApiError
   */
  public static updatePaymentSuccess(
    payment_id: number,
    requestBody: PaymentUpdateRequest,
  ): CancelablePromise<PaymentIntendResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: `/payments/${payment_id}`,
      body: requestBody,
    });
  }
  /**
   * API to get apipay request checksum
   * @param planId
   * @returns Checksum for airpay payment request
   * @throws ApiError
   */
  public static generateAirpayChecksum(
    planId: number,
  ): CancelablePromise<GenerateChecksumResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `payments/airpay/generate-checksum`,
      body: { planId },
      mediaType: 'application/json',
    });
  }

  /**
   * API to get verify Customer Vpa
   * @param requestBody
   * @returns response for verifyCustomerVpa
   * @throws ApiError
   */
  public static verifyCustomerVpa(
    requestBody?: checkCustomerVpaRequest,
  ): CancelablePromise<checkCustomerVpaResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `payments/hdfc/verify-customer-vpa`,
      body: requestBody,
      // mediaType: 'application/json',
    });
  }

  /**
   * API to initiate UpiWebCollect
   * @param requestBody
   * @returns response initiateUpiWebCollect
   * @throws ApiError
   */
  public static initiateUpiWebCollect(
    requestBody?: initiateUpiWebCollectRequest,
  ): CancelablePromise<initiateUpiWebCollectResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `payments/hdfc/initiate-web-collect`,
      body: requestBody,
    });
  }

  /**
   * API to Check Transaction Status
   * @param name
   * @returns Check Transaction Status
   * @throws ApiError
   */
  public static checkUpiTransactionStatus(
    orderId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `payments/hdfc/transaction-status?orderId=${orderId}`,
    });
  }
}
