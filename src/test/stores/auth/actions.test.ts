import { AnyAction } from 'redux';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import AxiosMock from 'axios-mock-adapter';
import { IUser, IAuthData } from '../../../stores/auth/types';
import { loginRequestAction, loginSuccessAction, loginFailedAction, loginAsync } from '../../../stores/auth/actions';
import { IApplicationState } from '../../../stores/config-reducers';
import { AxiosService } from '../../../services/axios.service';

type DispatchExtension = ThunkDispatch<IApplicationState, void, AnyAction>;
const mockStore = createMockStore<{}, DispatchExtension>([thunk]);

const axiosMock = new AxiosMock(AxiosService);

describe('auth actions', () => {
  it('login request', () => {
    const expectedAction = {
      type: loginRequestAction.type,
    };

    expect(loginRequestAction()).toEqual(expectedAction);
  });

  it('login success', () => {
    const user: IUser = {
      name: 'test',
    };

    const expectedAction = {
      type: loginSuccessAction.type,
      payload: user,
    };

    expect(loginSuccessAction(user)).toEqual(expectedAction);
  });

  it('login failed', () => {
    const expectedAction = {
      type: loginFailedAction.type,
      payload: 'error',
    };

    expect(loginFailedAction('error')).toEqual(expectedAction);
  });

  it('login async', async () => {
    const authData: IAuthData = {
      user: {
        name: 'test',
      },
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

    const store = mockStore({
      auth: {},
      route: {},
    });

    axiosMock.onPost('/auth/login', {
      login: 'user',
      password: 'password',
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
