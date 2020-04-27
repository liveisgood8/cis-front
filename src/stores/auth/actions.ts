import { login, register, logout } from '../../services/auth.service';
import { createAction } from '@reduxjs/toolkit';
import { IAuthData } from './types';
import { push } from 'connected-react-router';
import { AxiosError } from 'axios';
import { AppThunkAction } from '../../types';
import { handleAxiosError } from '../../utils/axios';
import { fetchPermissions, setPermissionsAction } from '../permissions/actions';
import { fetchPendingNumber, setPendingNumber } from '../business-requests/actions';

export const setAuthUserImageUrl = createAction<string>('@@auth/setAuthUserImageUrl');

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
      dispatch(fetchPendingNumber());
      dispatch(fetchPermissions());
      dispatch(push('/'));
    })
    .catch((err: AxiosError) => {
      console.log(err);
      dispatch(loginFailedAction());
      handleAxiosError(err, 'Неизвестная ошибка при аутентификации');
    });
};

export const logoutThunk = (): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  logout();
  dispatch(setPendingNumber(0));
  dispatch(setPermissionsAction([]));
  dispatch(push('/login'));
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
