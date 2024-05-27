/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EpisodeItem = {
  id?: number;
  episode_number?: number;
};

export type AddOrRemoveEpisodeRequest = {
  episodes?: EpisodeItem[];
};
