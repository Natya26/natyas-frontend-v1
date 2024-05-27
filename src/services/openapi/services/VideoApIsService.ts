/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { request as _request } from '../../../utils/request';
import { SignedUrlRequest } from '../models/SignedUrlRequest';
import { SignedUrlResponse } from '../models/SignedUrlResponse';
import { SignedUploadCmplRequest } from '../models/SignedUploadCmplRequest';
import { SignedUploadCmplResponse } from '../models/SignedUploadCmplResponse';
import { UpdateVideoRequest } from '../models/UpdateVideoRequest';
import { UpdateVideoResponse } from '../models/UpdateVideoResponse';
import { UploadPosterRequest } from '../models/UploadPosterRequest';
import { UploadVideoPosterResponse } from '../models/UploadVideoPosterResponse';
import { GetVideoResponse } from '../models/GetVideoResponse';
import { DeleteVideoResponse } from '../models/DeleteVideoResponse';
import { GetVideoListResponse } from '../models/GetVideoListResponse';

export class VideoApIsService {
  /**
   * API to get signed url for video upload
   * @param requestBody
   * @returns Signed URL Success
   * @throws ApiError
   */
  public static getSignedUrl(
    requestBody?: SignedUrlRequest,
  ): CancelablePromise<SignedUrlResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/videos/get-signed-url',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to signal upload completion
   * @param requestBody
   * @returns Video Data Success
   * @throws ApiError
   */
  public static completeSignedUpload(
    requestBody?: SignedUploadCmplRequest,
  ): CancelablePromise<SignedUploadCmplResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/videos/signed-upload-complete',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to update video data
   * @param videoId
   * @param requestBody
   * @returns Video Data Success
   * @throws ApiError
   */
  public static updateVideo(
    videoId?: string,
    requestBody?: UpdateVideoRequest,
  ): CancelablePromise<UpdateVideoResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `/videos/${videoId}/update`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to upload video poster
   * @param videoId
   * @param requestBody
   * @returns Video Data Success
   * @throws ApiError
   */
  public static uploadVideoPoster(
    videoId?: string,
    requestBody?: UploadPosterRequest,
  ): CancelablePromise<UploadVideoPosterResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: `/videos/${videoId}/upload-poster`,
      body: requestBody,
    });
  }

  /**
   * API to Video Data
   * @param videoId
   * @returns Video Data Success
   * @throws ApiError
   */
  public static getVideo(
    videoId?: string,
  ): CancelablePromise<GetVideoResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/videos/${videoId}/get`,
    });
  }

  /**
   * API to List Videos
   * @param page
   * @param page_length
   * @param order
   * @returns Video Data Success
   * @throws ApiError
   */
  public static listAllVideo(
    page?: number,
    page_length?: number,
    order?: string,
  ): CancelablePromise<GetVideoListResponse> {
    const query = { page, page_length, order };
    return __request(OpenAPI, {
      method: 'GET',
      url: `/videos/list`,
      query,
    });
  }

  /**
   * API to List Videos
   * @param videoId
   * @returns Video Data Success
   * @throws ApiError
   */
  public static deleteVideo(
    videoId?: string,
  ): CancelablePromise<DeleteVideoResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/videos/${videoId}/delete`,
    });
  }

  /**
   * API to Upload Video
   * @param file
   * @param signedUrl
   * @returns Video Data Success
   * @throws ApiError
   */
  public static uploadVideo(file?: File, signedUrl?: string): Promise<any> {
    return _request(signedUrl!, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': file?.type!,
      },
      body: file,
    });
  }
}
