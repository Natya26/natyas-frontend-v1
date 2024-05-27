/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from "./VideoMetaData";


export type UpdateVideoResponse = {
    err?: boolean;
    msg?: string;
    data?: {
        metadata?: VideoMetaData[];
        video?: any;
    }
    details?: any;
};
