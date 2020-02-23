import { createReducer } from '@reduxjs/toolkit';
import { IToastState } from './types';
import { addToastAction, clearToastAction } from './actions';

const initialState: IToastState = {
  toasts: [],
};

export const toastsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToastAction, (state, action) => ({ ...state, toasts: state.toasts.concat(action.payload) }))
    .addCase(clearToastAction, (state) => ({
      ...state,
      toasts: [],
    }));
});
