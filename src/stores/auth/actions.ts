import { login, register } from '../../services/auth.service';
import { createAction } from '@reduxjs/toolkit';
import { IAuthData } from './types';
import { push } from 'connected-react-router';
import { AxiosError } from 'axios';
import { AppThunkAction } from '../../types';
import { handleAxiosError } from '../../utils/axios';

export const loginRequestAction = createAction<void, '@@auth/loginRequest'>('@@auth/loginRequest');
export const loginSuccessAction = createAction<IAuthData, '@@auth/loginSuccess'>('@@auth/loginSuccess');
export const loginFailedAction = createAction<void, '@@auth/loginFailed'>('@@auth/loginFailed');

export const registerRequestAction = createAction<void>('@@auth/registerRequest');
export const registerSuccessAction = createAction<void>('@@auth/registerSuccess');
export const registerFailedAction = createAction<void>('@@auth/registerFailed');


export const loginAsync = (
  username: string,
  password: string,
): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  dispatch(loginRequestAction());

  return login(username, password)
    .then((authData) => {
      dispatch(loginSuccessAction(authData));
      dispatch(push('/'));
    })
    .catch((err: AxiosError) => {
      dispatch(loginFailedAction());
      handleAxiosError(err, 'Неизвестная ошибка при аутентификации');
    });
};

export const registerAsync = (
  login: string,
  password: string,
  name: string,
  surname: string,
  imageUrl: string,
): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  dispatch(registerRequestAction());

  try {
    await register(
      login,
      password,
      name,
      surname,
      imageUrl,
    );
    dispatch(registerSuccessAction());
    dispatch(push('/login'));
  } catch (err) {
    dispatch(registerFailedAction());
    handleAxiosError(err, 'Неизвестная ошибка при регистрации');
  }
};
