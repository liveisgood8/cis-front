import { changeViewTypeAction } from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { ISideBarState, ViewTypes } from './types';

const initialState: ISideBarState = {
  viewType: ViewTypes.Menu,
};

export const sideBarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeViewTypeAction, (state, action) => ({ ...state, viewType: action.payload }));
});
