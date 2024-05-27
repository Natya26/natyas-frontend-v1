/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { GetLookupResponse } from '../models/GetLookupResponse';

export class GeneralApIsService {


    /**
     * API to get Lookup Data
     * @param name
     * @returns Lookup Data Success
     * @throws ApiError
     */
    public static getLookupData(
name?: string
): CancelablePromise<GetLookupResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lookups',
            query: { name }
        });
    }
        
}
