import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export type CommonState = {
  isLoading: boolean;
  isInit: boolean;
  isNormalHeader: boolean;
};

const initialState: CommonState = {
  isLoading: false,
  isInit: false,
  isNormalHeader: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsInit(state, action) {
      state.isInit = action.payload;
    },
    setIsNormalHeader(state, action) {
      state.isNormalHeader = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.common,
      };
    },
  },
});

export const { setIsLoading, setIsInit, setIsNormalHeader } = commonSlice.actions;

export const selectCommonState = (state: AppState) => state.common;
