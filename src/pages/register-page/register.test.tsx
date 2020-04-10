import React from 'react';
import { shallow, mount } from 'enzyme';
import { RegisterPage } from '.';
import { userMock } from '../../__mocks__/entitites';
import { ProfileSettingsComponent } from '../../components/profile-settings';
import { Form } from 'react-bootstrap';

describe('register page', () => {
  it('raw render', () => {
    const wrapper = shallow(
      <RegisterPage
        isRegistering={false}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerAsync={async (...userMock): Promise<void> => {}}
      />,
    );
    expect(wrapper.exists(ProfileSettingsComponent)).toBeTruthy();
    expect(wrapper.find('p').at(0).text()).toBe('Регистрация в системе');
  });

  it('calling of register on submit setting component', async () => {
    const registerMock = jest.fn();
    const wrapper = shallow(
      <RegisterPage
        isRegistering={false}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        registerAsync={registerMock}
      />,
    );
    await wrapper.find(ProfileSettingsComponent).invoke('onSubmit')(userMock);
    expect(registerMock.mock.calls.length).toBe(1);
    expect(registerMock.mock.calls[0][0]).toEqual(userMock.login);
    expect(registerMock.mock.calls[0][1]).toEqual(userMock.password);
    expect(registerMock.mock.calls[0][2]).toEqual(userMock.name);
    expect(registerMock.mock.calls[0][3]).toEqual(userMock.surname);
    expect(registerMock.mock.calls[0][4]).toEqual(userMock.imageUrl);
  });
});
