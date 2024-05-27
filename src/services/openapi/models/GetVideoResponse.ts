/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from "./VideoMetaData";


export type GetVideoResponse = {
    err?: boolean;
    msg?: string;
    data?: {
        metadata?: VideoMetaData;
        video?: any;
    }
    details?: any;
};
