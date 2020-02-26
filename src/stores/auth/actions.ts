import { login } from '../../services/auth.service';
import { createAction } from '@reduxjs/toolkit';
import { IAuthData } from './types';
import { push } from 'connected-react-router';
import { addToastAction } from '../toast/actions';
import { AxiosError } from 'axios';
import { AppThunkAction } from '../../types';

export const loginRequestAction = createAction<void, '@@auth/loginRequest'>('@@auth/loginRequest');
export const loginSuccessAction = createAction<IAuthData, '@@auth/loginSuccess'>('@@auth/loginSuccess');
export const loginFailedAction = createAction<string, '@@auth/loginFailed'>('@@auth/loginFailed');


export const loginAsync = (
  username: string,
  password: string,
): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
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

  return login(username, password)
    .then((authData) => {
      dispatch(loginSuccessAction(authData));
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
