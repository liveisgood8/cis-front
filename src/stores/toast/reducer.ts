import { createReducer } from '@reduxjs/toolkit';
import { IToastState } from './types';
import { addToastAction, removeToastAction } from './actions';

const initialState: IToastState = {
  toasts: [],
};

export const toastsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToastAction, (state, action) => ({ ...state, toasts: state.toasts.concat(action.payload) }))
    .addCase(removeToastAction, (state, action) => ({
      ...state,
      toasts: state.toasts.filter((e) => e.title !== action.payload.title &&
        e.message !== action.payload.message),
    }));
});
