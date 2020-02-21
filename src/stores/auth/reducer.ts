import { getAuthenticatedUser } from '../../services/auth.service';
import { loginRequestAction, loginSuccessAction, loginFailedAction } from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { IAuthenticateState } from './types';

const user = getAuthenticatedUser();
const initialState: IAuthenticateState = user ?
  { loggingIn: false, user: user } : { loggingIn: false };

export const authenticateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequestAction, (state) => ({ ...state, loggingIn: true }))
    .addCase(loginSuccessAction, (state, action) => ({
      ...state,
      loggingIn: false,
      user: action.payload,
    }))
    .addCase(loginFailedAction, (state, action) => ({
      ...state,
      loggingIn: false,
      error: action.payload,
    }));
});
