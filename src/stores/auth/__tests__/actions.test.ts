import AxiosMock from 'axios-mock-adapter';
import { IUser, IAuthData } from '../types';
import { loginRequestAction, loginSuccessAction, loginAsync } from '../actions';
import { AxiosService } from '../../../services/axios.service';
import md5 from 'md5';
import { mockStore } from '../../../__mocks__/store';

const axiosMock = new AxiosMock(AxiosService);

describe('auth actions', () => {
  it('login request', () => {
    const expectedAction = {
      type: loginRequestAction.type,
    };

    expect(loginRequestAction()).toEqual(expectedAction);
  });

  it('login success', () => {
    const authData: IAuthData = {
      user: {
        name: 'test',
      } as IUser,
      accessToken: '__accessToken__',
      refreshToken: '__refreshToken__',
    };

    const expectedAction = {
      type: loginSuccessAction.type,
      payload: authData,
    };

    expect(loginSuccessAction(authData)).toEqual(expectedAction);
  });

  it('login async', async () => {
    const authData: IAuthData = {
      user: {
        name: 'test',
      } as IUser,
      accessToken: '__accessToken__',
      refreshToken: '__refreshToken__',
    };
    const expectedActions = [
      { type: loginRequestAction.type, payload: undefined },
      { type: loginSuccessAction.type, payload: authData },
      {
        type: '@@router/CALL_HISTORY_METHOD', payload: {
          args: ['/'],
          method: 'push',
        },
      },
    ];

    const store = mockStore<{}>({
      auth: {},
      route: {},
    });

    axiosMock.onPost('/auth/login', {
      login: 'user',
      password: md5('password'),
    }).replyOnce(200, {
      user: authData.user,
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    });

    loginAsync('user', 'password');
    return store.dispatch(loginAsync('user', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
