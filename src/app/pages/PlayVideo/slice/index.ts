import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManagePlayVideoState } from './types';

interface CurrentlyWatchingPayload {
  name?: string;
  description?: string;
  duration?: number;
  poster?: string;
}

export const initialState: ManagePlayVideoState = {
  videoUrl: '',
  thumbnail: '',
  currentlyWatching: {
    name: '',
    description: '',
    duration: undefined,
    poster: '',
  },
};

const slice = createSlice({
  name: 'managePlayVideo',
  initialState,
  reducers: {
    setVideoUrl(state, action: PayloadAction<string>) {
      state.videoUrl = action.payload;
    },
    setThumbnail(state, action: PayloadAction<string>) {
      state.thumbnail = action.payload;
    },
    setCurrentlyWatching(
      state,
      action: PayloadAction<CurrentlyWatchingPayload>,
    ) {
      if (state.currentlyWatching) {
        state.currentlyWatching.name = action.payload.name;
        state.currentlyWatching.description = action.payload.description;
        state.currentlyWatching.duration = action.payload.duration;
        state.currentlyWatching.poster = action.payload.poster;
      }
    },
  },
});

export const { actions: managePlayVideoActions } = slice;

export const useManagePlayVideoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
