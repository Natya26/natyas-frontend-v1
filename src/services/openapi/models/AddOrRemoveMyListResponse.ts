import { Cast } from './Cast';
import { Genre } from './Genre';
import { Language } from './Language';
import { Season } from './Season';
import { VideoMetaData } from './VideoMetaData';

export type AddOrRemoveMyListResponse = {
  err?: boolean;
  msg?: string | null;
  data?: {
    id?: number;
    name?: string;
    description?: string;
    poster?: string;
    release_date?: string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    featured?: boolean;
    coming_soon?: boolean;
    director?: string;
    casts?: Cast[];
    season_count?: number;
    episode_count?: number;
    genres?: Genre[];
    languages?: Language[];
    trailers?: VideoMetaData[];
    seasons?: Season[];
    isInMyList?: boolean;
    isLiked?: boolean;
    likes?: number;
  };
  details: any;
};
