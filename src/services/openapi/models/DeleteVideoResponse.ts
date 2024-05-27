/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from "./VideoMetaData";


export type DeleteVideoResponse = {
    err?: boolean;
    msg?: string;
    data?: {
        requestStatus?: any;
        video?: VideoMetaData;
    }
    details?: any;
};
