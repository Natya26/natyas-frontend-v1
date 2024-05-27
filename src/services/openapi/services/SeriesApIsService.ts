/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { request as _request } from '../../../utils/request';
import { UploadPosterRequest } from '../models/UploadPosterRequest';
import { GetSeriesResponse } from '../models/GetSeriesResponse';
import { GetSeriesListResponse } from '../models/GetSeriesListResponse';
import { CreateSeriesResponse } from '../models/CreateSeriesResponse';
import { CreateSeriesRequest } from '../models/CreateSeriesRequest';
import { UpdateOrCreateSeasonRequest } from '../models/UpdateOrCreateSeasonRequest';
import { AddOrRemoveEpisodeRequest } from '../models/AddOrRemoveEpisodeRequest';
import { AddOrRemoveTrailerRequest } from '../models/AddOrRemoveTrailerRequest';
import { DeleteSeriesResponse } from '../models/DeleteSeriesResponse';
import { DeleteSeasonResponse } from '../models/DeleteSeasonResponse';
import { GetVideoListResponse } from '../models/GetVideoListResponse';
import { GetSimilarSeriesResponse } from '../models/GetSimilarSeriesResponse';
import {
  AddOrRemoveLikedSeriesRequest,
  AddOrRemoveActions,
} from '../models/AddOrRemoveLikedSeriesRequest';
import { AddOrRemoveLikedSeriesResponse } from '../models/AddOrRemoveLikedSeriesResponse';

export class SeriesApIsService {
  /**
   * API to get Series Data
   * @param seriesId
   * @returns Series Data Success
   * @throws ApiError
   */
  public static getSeries(
    seriesId?: number,
  ): CancelablePromise<GetSeriesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/series/${seriesId}/get`,
    });
  }
  /**
   * API to get Similar Series Data
   * @param seriesId
   * @returns Series Data Success
   * @throws ApiError
   */
  public static getSimilarSeries(
    seriesId?: number,
  ): CancelablePromise<GetSimilarSeriesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/similar-series`,
      query: { seriesId },
    });
  }
  /**
   * API to Add or Remove Liked Series Data
   * @param seriesId
   * @returns Series Data Success
   * @throws ApiError
   */
  public static addOrRemoveLikedSeries(
    requestBody?: AddOrRemoveLikedSeriesRequest,
    action?: AddOrRemoveActions,
  ): CancelablePromise<AddOrRemoveLikedSeriesResponse> {
    const query = { action };
    return __request(OpenAPI, {
      method: 'POST',
      url: `/app/liked`,
      body: requestBody,
      query,
    });
  }

  /**
   * API to get Series List
   * @param page
   * @param pageLength
   * @param order
   * @returns Series List Success
   * @throws ApiError
   */
  public static getSeriesList(
    page?: number,
    pageLength?: number,
    order?: string,
  ): CancelablePromise<GetSeriesListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/series/list',
      query: { page, order, page_length: pageLength },
    });
  }

  /**
   * API to create Series
   * @param requestBody
   * @returns Series Data Success
   * @throws ApiError
   */
  public static createSeries(
    requestBody?: CreateSeriesRequest,
  ): CancelablePromise<CreateSeriesResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/series/create',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to update Series
   * @param seriesId
   * @param requestBody
   * @returns Series Data Success
   * @throws ApiError
   */
  public static updateSeries(
    seriesId?: number,
    requestBody?: CreateSeriesRequest,
  ): CancelablePromise<CreateSeriesResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `/series/${seriesId}/update`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to create or update season
   * @param seriesId
   * @param requestBody
   * @param seasonId
   * @returns Series Data Success
   * @throws ApiError
   */
  public static updateOrCreateSeason(
    seriesId?: number,
    requestBody?: UpdateOrCreateSeasonRequest,
    seasonId?: number,
  ): CancelablePromise<CreateSeriesResponse> {
    let url = `/series/${seriesId}/seasons`;
    if (seasonId) url = `/series/${seriesId}/seasons/${seasonId}`;
    return __request(OpenAPI, {
      method: 'POST',
      url,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to add or remove Episodes
   * @param seriesId
   * @param requestBody
   * @param seasonId
   * @returns Series Data Success
   * @throws ApiError
   */
  public static addOrRemoveEpisode(
    seriesId?: number,
    requestBody?: AddOrRemoveEpisodeRequest,
    seasonId?: number,
  ): CancelablePromise<CreateSeriesResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `/series/${seriesId}/seasons/${seasonId}/episodes`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to add or remove Trailers
   * @param seriesId
   * @param requestBody
   * @returns Series Data Success
   * @throws ApiError
   */
  public static addOrRemoveTrailer(
    seriesId?: number,
    requestBody?: AddOrRemoveTrailerRequest,
  ): CancelablePromise<CreateSeriesResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `/series/${seriesId}/trailers`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to delete Series
   * @param seriesId
   * @returns Series ID Success
   * @throws ApiError
   */
  public static deleteSeries(
    seriesId?: number,
  ): CancelablePromise<DeleteSeriesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/series/${seriesId}/delete`,
    });
  }

  /**
   * API to delete Season
   * @param seriesId
   * @param seasonId
   * @returns Series ID Success
   * @throws ApiError
   */
  public static deleteSeason(
    seriesId?: number,
    seasonId?: number,
  ): CancelablePromise<DeleteSeasonResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/series/${seriesId}/seasons/${seasonId}/delete`,
    });
  }

  /**
   * API to upload series poster
   * @param seriesId
   * @param requestBody
   * @returns Series Data Success
   * @throws ApiError
   */
  public static uploadSeriesPoster(
    seriesId?: number,
    requestBody?: UploadPosterRequest,
  ): CancelablePromise<CreateSeriesResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `/series/${seriesId}/upload-poster`,
      body: requestBody,
    });
  }

  /**
   * API to get Series List
   * @param page
   * @param pageLength
   * @returns Series List Success
   * @throws ApiError
   */
  public static getVideoList(
    page?: number,
    pageLength?: number,
  ): CancelablePromise<GetVideoListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/series/videos/list',
      query: { page, page_length: pageLength },
    });
  }
}
