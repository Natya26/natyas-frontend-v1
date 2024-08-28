import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageAppState } from './types';
import { RoutePath } from 'app/RoutePath';

export const initialState: ManageAppState = {
  session: {
    isAuthenticated: false,
    redirectPath: RoutePath.homepage.path,
    // redirectPath: RoutePath.fusionhomepage.path,
  },
  pageLoader: false,
};

const slice = createSlice({
  name: 'manageApp',
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      if (state.session) {
        state.session.isAuthenticated = action.payload;
      }
    },
    setRedirectPath(state, action: PayloadAction<string>) {
      if (state.session) {
        state.session.redirectPath = action.payload;
      }
    },
    setPageLoader(state, action: PayloadAction<boolean>) {
      state.pageLoader = action.payload;
    },
  },
});

export const { actions: manageAppActions } = slice;

export const useManageAppSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
