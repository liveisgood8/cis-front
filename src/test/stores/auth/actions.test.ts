import { loginRequestAction, loginSuccessAction, loginFailedAction, loginAsync } from '../../../stores/auth/actions';
import { IUser } from '../../../stores/auth/types';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IApplicationState } from '../../../stores/config-reducers';

type DispatchExtension = ThunkDispatch<IApplicationState, void, AnyAction>;
const mockStore = createMockStore<{}, DispatchExtension>([thunk]);

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
    const user: IUser = {
      name: 'user',
    };
    const expectedActions = [
      { type: loginRequestAction.type },
      { type: loginSuccessAction.type, payload: user },
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

    loginAsync('user', 'password');
    return store.dispatch(loginAsync('user', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
