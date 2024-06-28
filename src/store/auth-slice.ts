import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import { AuthResponse } from '@/models/auth';

export type AuthState = {
  typeRegister: 'FREE' | 'PREMIUM';
  emailVerify: string;
  information: AuthResponse | undefined;
  renderHeaderInfo: number;
};

const initialState: AuthState = {
  typeRegister: 'FREE',
  emailVerify: '',
  information: undefined,
  renderHeaderInfo: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTypeRegister(state, action) {
      state.typeRegister = action.payload;
    },
    setEmailVerify(state, action) {
      state.emailVerify = action.payload;
    },
    setAuthInformation(state, action) {
      state.information = action.payload;
    },
    setRenderHeaderInfo(state, action) {
      state.renderHeaderInfo = action.payload;
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

export const { setTypeRegister, setEmailVerify, setAuthInformation, setRenderHeaderInfo } =
  authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
