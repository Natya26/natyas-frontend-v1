/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Category } from "./Category";
import { Genre } from "./Genre";
import { VideoMetaData } from "./VideoMetaData";


export type UpdateVideoRequest = {
    name?: string;
    description?: string;
    duration?: number;
    categories?: Category[];
    genres?: Genre[];
    language_id?: number;
    unpublish: false;
    published: true;
    remote: false;
    no_ads: true,
    ad_keywords: "special_ads"
};
