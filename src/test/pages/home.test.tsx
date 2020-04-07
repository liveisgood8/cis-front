import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../../pages/home-page';

Enzyme.configure({ adapter: new Adapter() });

describe('home page', () => {
  it('render', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('span').at(0).text()).toBe('Добро пожаловать!');
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Button').at(0).text()).toBe('Добавить клиента');
    expect(wrapper.find('footer').at(0).first().text())
      .toBe('Powered by Nexus');
  });
});
