import { authenticateReducer } from '../../../stores/auth/reducer';
import { IAuthenticateState, IUser } from '../../../stores/auth/types';
import { loginRequestAction, loginSuccessAction, loginFailedAction } from '../../../stores/auth/actions';

describe('auth reducer', () => {
  it('default state', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      user: undefined,
      error: undefined,
    };
    expect(authenticateReducer(undefined, { type: '' })).toEqual(expectedState);
  });

  it('login request handle', () => {
    const expectedState: IAuthenticateState = {
      loggingIn: true,
      user: undefined,
      error: undefined,
    };
    expect(authenticateReducer(undefined, loginRequestAction())).toEqual(expectedState);
  });

  it('login success handle', () => {
    const user: IUser = {
      name: 'test',
    };
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      user: user,
      error: undefined,
    };
    expect(authenticateReducer(undefined, loginSuccessAction(user))).toEqual(expectedState);
  });

  it('login failed handle', () => {
    const error = new Error('test');
    const expectedState: IAuthenticateState = {
      loggingIn: false,
      user: undefined,
      error: error,
    };
    expect(authenticateReducer({
      loggingIn: true,
    }, loginFailedAction(error))).toEqual(expectedState);
  });
});
