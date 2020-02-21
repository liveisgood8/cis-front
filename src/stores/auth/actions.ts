import { ThunkAction } from 'redux-thunk';
import { IApplicationState } from '../config-reducers';
import { login } from '../../services/auth.service';
import { createAction, Action } from '@reduxjs/toolkit';
import { IUser } from './types';

export const loginRequestAction = createAction<void, '@@auth/loginRequest'>('@@auth/loginRequest');
export const loginSuccessAction = createAction<IUser, '@@auth/loginSuccess'>('@@auth/loginSuccess');
export const loginFailedAction = createAction<Error, '@@auth/loginSuccess'>('@@auth/loginSuccess');

export type LoginAsyncThunk = ThunkAction<Promise<void>, IApplicationState, unknown, Action<string>>;

export const loginAsync = (
  username: string,
  password: string,
): LoginAsyncThunk => async (dispatch): Promise<void> => {
  dispatch(loginRequestAction());

  const user = await login(username, password);
  dispatch(loginSuccessAction(user));
};
