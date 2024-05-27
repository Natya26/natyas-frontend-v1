/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Category } from "./Category";
import { Genre } from "./Genre";
import { Language } from "./Language";
import { Season } from "./Season";
import { Series } from "./Series";

export type VideoMetaData = {
    id?: number;
    fwp_id?: string;
    name?: string;
    description?: string | null;
    poster?: string | null;
    duration?: number | null;
    active?: boolean | null;
    created_at?: string;
    updated_at?: string;
    series_id?: number | null;
    season_id?: number | null;
    language_id?: number | null;
    episode_number?: number | null;
    category?: Category;
    genres?: Genre[];
    language?: Language;
    series?: Series;
    season?: Season;
};
