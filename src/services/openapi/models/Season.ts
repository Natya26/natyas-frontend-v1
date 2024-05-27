/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { VideoMetaData } from "./VideoMetaData";

export type Season = {
    id?: number;
    series_id?: number;
    name?: string;
    description?: string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    season_number?: number;
    episodes?: VideoMetaData[];
};
