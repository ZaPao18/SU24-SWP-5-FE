import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { authSlice } from './auth-slice';
import { commonSlice } from './common-slice';

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [commonSlice.name]: commonSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
