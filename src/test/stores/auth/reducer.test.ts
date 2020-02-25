import { authenticateReducer } from '../../../stores/auth/reducer';
import { IAuthenticateState, IAuthData } from '../../../stores/auth/types';
import { loginRequestAction, loginSuccessAction, loginFailedAction } from '../../../stores/auth/actions';

describe('auth reducer', () => {
  it('default state', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      authData: undefined,
      error: undefined,
    };
    expect(authenticateReducer(undefined, { type: '' })).toEqual(expectedState);
  });

  it('login request handle', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: true,
      authData: undefined,
      error: undefined,
    };
    expect(authenticateReducer(undefined, loginRequestAction())).toEqual(expectedState);
  });

  it('login success handle', () => {
    const authData: IAuthData = {
      user: {
        name: 'test',
      },
      accessToken: 'access',
      refreshToken: 'refresh',
    };
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      authData: authData,
      error: undefined,
    };
    expect(authenticateReducer(undefined, loginSuccessAction(authData))).toEqual(expectedState);
  });

  it('login failed handle', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      authData: undefined,
      error: 'test',
    };
    expect(authenticateReducer({
      loggingIn: true,
    }, loginFailedAction('test'))).toEqual(expectedState);
  });
});
