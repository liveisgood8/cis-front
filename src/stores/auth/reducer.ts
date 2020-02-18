import { IAuthenticateState, IUser, AuthenticateActions, AuthenticateActionTypes } from './types';

const user = localStorage.getItem('user') as IUser | null;
const initialState: IAuthenticateState = user ?
  { loggingIn: false, user: user } : { loggingIn: false };

export function authenticateReducer(
  state: IAuthenticateState = initialState,
  action: AuthenticateActions,
): IAuthenticateState {
  switch (action.type) {
    case AuthenticateActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case AuthenticateActionTypes.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        user: action.user,
      };
    case AuthenticateActionTypes.LOGIN_FAIL:
      return {
        loggingIn: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};
