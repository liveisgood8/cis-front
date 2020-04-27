import React from 'react';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { userMock } from '../../__mocks__/entitites';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import NavigationBar from '.';
import { Link, Router } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { createMemoryHistory } from 'history';
import { reverseVisibleAction } from '../../stores/sidebar/actions';
import { act } from 'react-dom/test-utils';
import { setPendingNumber } from '../../stores/business-requests/actions';
import { setPermissionsAction } from '../../stores/permissions/actions';

describe('navigation unit', () => {
  (global as any).document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  const store = mockStore<IApplicationState>({
    auth: {
      authData: {
        user: userMock,
        accessToken: 'at',
        refreshToken: 'rt',
      },
    },
  });

  const history = createMemoryHistory();

  const setup = () => {
    return mount(
      <Provider store={store}>
        <Router history={history}>
          <NavigationBar />
        </Router>
      </Provider>,
    );
  };

  beforeEach(() => {
    store.clearActions();
  });

  it('raw render', () => {
    const wrapper = setup();
    expect(wrapper.find(Link).prop('to')).toEqual('/');
    expect(wrapper.find('h4').text()).toEqual('QCRM');

    expect(wrapper.find('Image').prop('src')).toEqual(userMock.imageUrl);
  });

  it('on sidebar menu click', () => {
    const wrapper = setup();
    wrapper.find('button').simulate('click');
    expect(store.getActions()).toEqual([
      {
        type: reverseVisibleAction.toString(),
      },
    ]);
  });

  it('open menu on avatar click', async () => {
    const wrapper = setup();

    await act(async () => {
      wrapper.find(OverlayTrigger).simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.length).toBe(1);

    expect(tooltip.find('p').at(0).text()).toEqual('Профиль');
    expect(tooltip.find('p').at(1).text()).toEqual('Выход');
  });


  it('on profile menu edit click', async () => {
    const wrapper = setup();

    await act(async () => {
      wrapper.find(OverlayTrigger).simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const tooltip = wrapper.find(Tooltip);
    tooltip.find('p').at(0).simulate('click');

    expect(store.getActions()).toEqual([
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            '/profile',
          ],
          method: 'push',
        },
      },
    ]);
  });

  it('on profile menu logout click', async () => {
    const wrapper = setup();

    await act(async () => {
      wrapper.find(OverlayTrigger).simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const tooltip = wrapper.find(Tooltip);
    tooltip.find('p').at(1).simulate('click');

    expect(store.getActions()).toHaveLength(3);
    expect(store.getActions()).toEqual([
      {
        type: setPendingNumber.toString(),
        payload: 0,
      },
      {
        type: setPermissionsAction.toString(),
        payload: [],
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            '/login',
          ],
          method: 'push',
        },
      },
    ]);
  });
});
