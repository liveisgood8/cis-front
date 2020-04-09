import { createReducer } from '@reduxjs/toolkit';
import { setPermissionsAction } from './actions';
import { IPermissionsState } from './types';

const initialState: IPermissionsState = {
  userPermissions: [],
};

export const permissionsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPermissionsAction, (state, action) => ({
    ...state, userPermissions: action.payload,
  }));
});
