import { createReducer } from '@reduxjs/toolkit';
import { ISideBarState } from './types';
import { reverseVisibleAction } from './actions';

const initialState: ISideBarState = {
  isVisible: false,
};

export const sideBarReduces = createReducer(initialState, (builder) => {
  builder
    .addCase(reverseVisibleAction, (state) => ({ ...state, isVisible: !state.isVisible }));
});
