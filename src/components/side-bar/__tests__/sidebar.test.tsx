import React from 'react';
import SideBar, { ViewTypes } from '..';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { IApplicationState } from '../../../stores/config-reducers';
import { mockStore } from '../../../__mocks__/store';
import { createLocation, createMemoryHistory } from 'history';
import { DeepPartial } from 'redux';
import { SideBarMenu } from '../menu';
import { UserPermissions } from '../../../stores/permissions/types';
import { Router } from 'react-router-dom';
import { SideBarClients } from '../clients';
import { SideBarContracts } from '../contracts';
import { SideBarTasks } from '../tasks';

describe('sidebar', () => {
  const baseState: DeepPartial<IApplicationState> = {
    router: {
      location: createLocation(`http://localhost?viewType=${ViewTypes.Menu}`),
      action: 'POP',
    },
    sideBar: {
      isVisible: true,
    },
    businessRequests: {
      pendingNumber: 1,
    },
    permissions: {
      userPermissions: [UserPermissions.ADD_CLIENTS],
    },
    businessEntities: {
      clients: [],
      contracts: [],
      tasks: [],
    },
  };

  const setup = (state: DeepPartial<IApplicationState>) => {
    const history = createMemoryHistory();
    return mount(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <SideBar />
        </Router>
      </Provider>,
    );
  };

  it('menu view type', () => {
    const wrapper = setup(baseState);
    expect(wrapper.find('nav').prop('className')).toEqual('active');
    expect(wrapper.contains(SideBarMenu as any)).toBeTruthy();
  });

  it('clients view type', () => {
    const wrapper = setup({
      ...baseState,
      router: {
        ...baseState.router,
        location: createLocation(`http://localhost?viewType=${ViewTypes.Clients}`),
      },
    });
    expect(wrapper.contains(SideBarClients as any)).toBeTruthy();
  });

  it('contracts view type', () => {
    const wrapper = setup({
      ...baseState,
      router: {
        ...baseState.router,
        location: createLocation(`http://localhost?viewType=${ViewTypes.Contracts}`),
      },
    });
    expect(wrapper.contains(SideBarContracts as any)).toBeTruthy();
  });

  it('tasks view type', () => {
    const wrapper = setup({
      ...baseState,
      router: {
        ...baseState.router,
        location: createLocation(`http://localhost?viewType=${ViewTypes.Tasks}`),
      },
    });
    expect(wrapper.contains(SideBarTasks as any)).toBeTruthy();
  });
});
