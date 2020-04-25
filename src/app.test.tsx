jest.mock('./routes', () => () => {
  return <div />;
});

import React from 'react';
import { mount } from 'enzyme';
import { mockStore } from './__mocks__/store';
import { IApplicationState } from './stores/config-reducers';
import { Provider } from 'react-redux';
import App from './app';
import { fetchPermissions } from './stores/permissions/actions';
import { fetchPendingNumber } from './stores/business-requests/actions';
import Routes from './routes';
import * as authService from './services/auth.service';
import { userMock } from './__mocks__/entitites';
import * as perm from './stores/permissions/actions';
import * as be from './stores/business-requests/actions';

test('app render test', () => {
  jest.spyOn(authService, 'getAuthenticateData')
    .mockReturnValue({
      accessToken: 'token',
      refreshToken: 'token',
      user: userMock,
    });
  const fetchPermissionSpy = jest.spyOn(perm, 'fetchPermissions');
  const fetchPendingNumberSpy = jest.spyOn(be, 'fetchPendingNumber');

  const store = mockStore<IApplicationState>({});
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(fetchPermissionSpy).toHaveBeenCalled();
  expect(fetchPendingNumberSpy).toHaveBeenCalled();
});
