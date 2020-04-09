import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Layout } from '.';
import SideBar from '../../components/side-bar';

Enzyme.configure({ adapter: new Adapter() });

describe('layout component', () => {
  it('render', () => {
    const wrapper = shallow(<Layout><div></div></Layout>);
    expect(wrapper.exists('NavigationBar')).toBeTruthy();
    expect(wrapper.find('div').at(0).hasClass('wrapper')).toBeTruthy();
    expect(wrapper.find('div').at(0).exists(SideBar)).toBeTruthy();
    expect(wrapper.find('div').at(0).exists('main')).toBeTruthy();
  });
});
