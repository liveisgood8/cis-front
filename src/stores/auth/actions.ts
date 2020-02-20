import { ThunkAction } from 'redux-thunk';
import { IApplicationState } from '../config-reducers';
import { AuthenticateActions, AuthenticateActionTypes } from './types';
import { login } from '../../services/auth.service';

export const loginAsync = (
  username: string,
  password: string,
): ThunkAction<Promise<void>, IApplicationState, unknown, AuthenticateActions> => async (dispatch): Promise<void> => {
  dispatch({
    type: AuthenticateActionTypes.LOGIN_REQUEST,
  });

  const user = await login(username, password);
  dispatch({
    type: AuthenticateActionTypes.LOGIN_SUCCESS,
    user: user,
  });
};
