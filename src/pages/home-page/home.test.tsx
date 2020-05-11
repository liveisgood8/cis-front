import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomePage } from '.';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { IApplicationState } from '../../stores/config-reducers';

Enzyme.configure({ adapter: new Adapter() });

describe('home page', () => {
  it('render', () => {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Provider store={mockStore<IApplicationState>({
        permissions: {
          userPermissions: [],
        },
      })}>
        <Router history={history}>
          <HomePage />
        </Router>
      </Provider>,
    );
    expect(wrapper.find('span').at(0).text()).toBe('Добро пожаловать!');
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Button').at(0).text()).toBe('Просмотреть обращения');
    expect(wrapper.find('footer').at(0).first().text())
      .toBe('Powered by Nexus');
  });
});
