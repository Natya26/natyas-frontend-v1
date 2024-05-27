/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from './VideoMetaData';

export type SignedUploadCmplResponse = {
  err?: boolean;
  msg?: string;
  data?: {
    uploadStatus?: {
      success?: boolean;
      message?: string;
    };
    video?: VideoMetaData;
  };
  details?: any;
};
