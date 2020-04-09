import { authenticateReducer } from '../reducer';
import { IAuthenticateState, IAuthData, IUser } from '../types';
import { loginRequestAction, loginSuccessAction, loginFailedAction } from '../actions';

describe('auth reducer', () => {
  it('default state', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      isRegistering: false,
      authData: undefined,
    };
    expect(authenticateReducer(undefined, { type: '' })).toEqual(expectedState);
  });

  it('login request handle', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: true,
      isRegistering: false,
      authData: undefined,
    };
    expect(authenticateReducer(undefined, loginRequestAction())).toEqual(expectedState);
  });

  it('login success handle', () => {
    const authData: IAuthData = {
      user: {
        name: 'test',
      } as IUser,
      accessToken: 'access',
      refreshToken: 'refresh',
    };
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      isRegistering: false,
      authData: authData,
    };
    expect(authenticateReducer(undefined, loginSuccessAction(authData))).toEqual(expectedState);
  });

  it('login failed handle', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      authData: undefined,
      isRegistering: false,
    };
    expect(authenticateReducer({
      loggingIn: true,
      isRegistering: false,
    }, loginFailedAction())).toEqual(expectedState);
  });
});
