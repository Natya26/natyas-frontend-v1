/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from "./VideoMetaData";


export type VideoListResponse = {
    err?: boolean;
    msg?: string;
    data?: VideoMetaData[];
    details?: any;
};
