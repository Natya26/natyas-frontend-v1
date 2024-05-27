/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Category } from "./Category";
import { Genre } from "./Genre";
import { Language } from "./Language";
import { VideoMetaData } from "./VideoMetaData";


export type GetLookupResponse = {
    err?: boolean;
    msg?: string;
    data?: {
        languages?: Language[];
        categories?: Category[];
        genres?: Genre[];
        trailers?: VideoMetaData[];
    };
    details?: any;
};
