import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NotFoundedPage } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('not founded page', () => {
  it('render with default text prop', () => {
    const wrapper = shallow(<NotFoundedPage />);
    expect(wrapper.find('span').at(0).text()).toBe('Страница не найдена!');
  });

  it('render with custom text', () => {
    const wrapper = shallow(<NotFoundedPage text="some custom err text" />);
    expect(wrapper.find('span').at(0).text()).toBe('some custom err text');
  });
});
