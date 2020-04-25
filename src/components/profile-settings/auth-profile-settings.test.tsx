import React from 'react';
import { AuthProfileSettingsComponent } from './auth-profile-settings';
import { mount } from 'enzyme';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { Provider } from 'react-redux';
import { ProfileSettingsComponent } from '.';

test('auth profile unit', () => {
  const wrapper = mount(
    <Provider store={mockStore<IApplicationState>({})}>
      <AuthProfileSettingsComponent />
    </Provider>);
  expect(wrapper.exists(ProfileSettingsComponent));
});
