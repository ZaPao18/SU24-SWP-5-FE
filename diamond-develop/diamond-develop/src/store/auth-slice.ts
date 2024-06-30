import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export type AuthState = {
  renderHeaderInfo: number;
  accountRole: number | null;
};

const initialState: AuthState = {
  renderHeaderInfo: 0,
  accountRole: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRenderHeaderInfo(state, action) {
      state.renderHeaderInfo = action.payload;
    },
    setAccountRole(state, action) {
      state.accountRole = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setRenderHeaderInfo, setAccountRole } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
