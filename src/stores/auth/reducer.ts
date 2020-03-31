import { getAuthenticateData } from '../../services/auth.service';
import {
  loginRequestAction,
  loginSuccessAction,
  loginFailedAction,
  registerRequestAction,
  registerFailedAction, 
  registerSuccessAction,
  setAuthUserImageUrl} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { IAuthenticateState } from './types';

const authData = getAuthenticateData();
const initialState: IAuthenticateState = authData ?
  { loggingIn: false, authData: authData, isRegistering: false } : { loggingIn: false, isRegistering: false };

export const authenticateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequestAction, (state) => ({ ...state, loggingIn: true }))
    .addCase(loginSuccessAction, (state, action) => ({
      ...state,
      loggingIn: false,
      authData: action.payload,
    }))
    .addCase(loginFailedAction, (state) => ({
      ...state,
      loggingIn: false,
    }))
    .addCase(setAuthUserImageUrl, (state, action) => {
      if (state.authData) {
        state.authData.user.imageUrl = action.payload;
      }
      return state;
    })
    .addCase(registerRequestAction, (state) => ({ ...state, isRegistering: true }))
    .addCase(registerSuccessAction, (state) => ({ ...state, isRegistering: false }))
    .addCase(registerFailedAction, (state) => ({ ...state, isRegistering: false }));
});
