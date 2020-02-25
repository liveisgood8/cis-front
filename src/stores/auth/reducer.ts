import { getAuthenticateData } from '../../services/auth.service';
import { loginRequestAction, loginSuccessAction, loginFailedAction } from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { IAuthenticateState } from './types';

const authData = getAuthenticateData();
const initialState: IAuthenticateState = authData ?
  { loggingIn: false, authData: authData } : { loggingIn: false };

export const authenticateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequestAction, (state) => ({ ...state, loggingIn: true }))
    .addCase(loginSuccessAction, (state, action) => ({
      ...state,
      loggingIn: false,
      authData: action.payload,
    }))
    .addCase(loginFailedAction, (state, action) => ({
      ...state,
      loggingIn: false,
      error: action.payload,
    }));
});
