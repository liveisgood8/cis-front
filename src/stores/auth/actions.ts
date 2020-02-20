import { ThunkAction } from 'redux-thunk';
import { IApplicationState } from '../config-reducers';
import { AuthenticateActions, AuthenticateActionTypes } from './types';
import { login } from '../../services/user.service';

function loginAction(username: string, password: string): AuthenticateActions {
  const user = login(username, password);
  return {
    type: AuthenticateActionTypes.LOGIN_SUCCESS,
    user: user,
  };
}

export const thunkLoginAction = (
  username: string,
  password: string,
): ThunkAction<void, IApplicationState, unknown, AuthenticateActions> => async (dispatch): Promise<void> => {
  dispatch(loginAction(username, password));
};
