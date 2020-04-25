import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginPage, PropsFromRedux } from '.';
import { formEventMock } from '../../__mocks__/form-utils';

Enzyme.configure({ adapter: new Adapter() });

function setup(): {
  props: PropsFromRedux;
  loginMock: jest.Mock;
  wrapper: Enzyme.ShallowWrapper;
  } {
  const loginMock = jest.fn();
  const props: PropsFromRedux = {
    loggingIn: false,
    loginAsync: loginMock,
  };
  const wrapper = shallow(<LoginPage {...props}/>);
  return {
    props,
    loginMock,
    wrapper,
  };
}

describe('Pages', () => {
  describe('LoginPage', () => {
    it('rendering self', () => {
      const { wrapper } = setup();
      expect(wrapper.find('p').length).toBe(2);
      expect(wrapper.find('p').at(0).text()).toBe('Вход в систему');
      expect(wrapper.find('p').at(1).text()).toContain('Нет аккаунта?');

      expect(wrapper.find('FormControl').length).toBe(2);
      expect(wrapper.find('FormControl').at(0).prop('placeholder')).toBe('Логин');
      expect(wrapper.find('FormControl').at(1).prop('placeholder')).toBe('Пароль');

      expect(wrapper.find('Button').at(0).prop('disabled')).toBe(false);
      expect(wrapper.find('Button').at(0).text()).toBe('Вход');

      expect(wrapper.find('p').at(1).find('Link').text()).toBe('Зарегистрироваться');
      expect(wrapper.find('p').at(1).find('Link').prop('to')).toBe('/registration');
    });

    it('call login on submit form', () => {
      const { wrapper, loginMock } = setup();
      expect(loginMock).toHaveBeenCalledTimes(0);
      wrapper.find('Form').simulate('submit', formEventMock);
      expect(loginMock).toHaveBeenCalledTimes(1);
    });
  });
});
