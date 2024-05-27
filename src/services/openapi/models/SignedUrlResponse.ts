/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from "./VideoMetaData";


export type SignedUrlResponse = {
    err?: boolean;
    msg?: string;
    data?: {
        signed_video_url?: string;
        video?: VideoMetaData;
    }
    details?: any;
};
