import { ThunkAction } from 'redux-thunk';
import { IApplicationState } from '../config-reducers';
import { login } from '../../services/auth.service';
import { createAction, Action } from '@reduxjs/toolkit';
import { IUser } from './types';
import { push } from 'connected-react-router';
import { addToastAction } from '../toast/actions';
import { AxiosError } from 'axios';

export const loginRequestAction = createAction<void, '@@auth/loginRequest'>('@@auth/loginRequest');
export const loginSuccessAction = createAction<IUser, '@@auth/loginSuccess'>('@@auth/loginSuccess');
export const loginFailedAction = createAction<string, '@@auth/loginFailed'>('@@auth/loginFailed');

export type LoginAsyncThunk = ThunkAction<Promise<void>, IApplicationState, unknown, Action<string>>;

export const loginAsync = (
  username: string,
  password: string,
): LoginAsyncThunk => async (dispatch): Promise<void> => {
  dispatch(loginRequestAction());
  if (!username || !login) {
    const errorMessage = 'Поля с логином и паролем должны быть заполнены';
    dispatch(addToastAction({
      type: 'danger',
      title: 'Ошибка входа',
      message: errorMessage,
    }));
    dispatch(loginFailedAction(errorMessage));
    return;
  }

  login(username, password)
    .then((user) => {
      dispatch(loginSuccessAction(user));
      dispatch(push('/'));
    })
    .catch((err: AxiosError) => {
      dispatch(loginFailedAction(err.response?.data?.error));
      dispatch(addToastAction({
        type: 'danger',
        title: 'Ошибка входа',
        message: err.response?.data?.error,
      }));
    });
};
