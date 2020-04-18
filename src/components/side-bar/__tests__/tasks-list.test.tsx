import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import { IApplicationState } from '../../../stores/config-reducers';
import { act } from '@testing-library/react';
import * as be from '../../../services/business-entities.service';
import { tasksMock } from '../../../__mocks__/entitites';
import { BaseEntitiesList } from '../base-entities';
import { mockStore } from '../../../__mocks__/store';
import { DeepPartial } from 'redux';
import { createLocation, createMemoryHistory } from 'history';
import { ViewTypes } from '..';
import { UserPermissions } from '../../../stores/permissions/types';
import { Router } from 'react-router-dom';
import SideBarTasks from '../tasks';

describe('side bar tasks list', () => {
  const baseState: DeepPartial<IApplicationState> = {
    router: {
      location: createLocation(`http://localhost?viewType=${ViewTypes.Tasks}&clientId=1&contractId=1`),
      action: 'POP',
    },
    permissions: {
      userPermissions: [UserPermissions.ADD_TASKS],
    },
    businessEntities: {
      tasks: tasksMock,
    },
  };

  const setup = async (store: MockStore) => {
    const fetchContractsSpy = jest.spyOn(be, 'fetchTasks')
      .mockResolvedValue(tasksMock);

    const wrapper = mount(
      <Provider store={store}>
        <Router history={createMemoryHistory()}>
          <SideBarTasks />
        </Router>
      </Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(fetchContractsSpy).toHaveBeenCalled();
    expect(fetchContractsSpy).toHaveBeenCalledWith(1); // 1 - contractId in url
    return wrapper;
  };

  it('with add perm', async () => {
    const wrapper = await setup(mockStore<IApplicationState>(baseState));

    const addEntityComponent = shallow(wrapper.find(BaseEntitiesList)
      .prop('addEntityComponent') as any);
    expect(addEntityComponent.text())
      .toContain('Добавить задачу');
  });

  it('without add perm', async () => {
    const wrapper = await setup(mockStore<IApplicationState>({
      ...baseState,
      permissions: {
        userPermissions: [],
      },
    }));

    expect(wrapper.find(BaseEntitiesList).prop('addEntityComponent'))
      .toBeUndefined();
  });

  it('on task click', async () => {
    const store = mockStore(baseState);
    const wrapper = await setup(store);
    wrapper.find('ul').at(1).find('button').at(0).simulate('click');
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[1]).toEqual(
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            `/task/${tasksMock[0].id}${baseState.router?.location?.search}`,
          ],
          method: 'push',
        },
      },
    );
  });

  it('on back click', async () => {
    const store = mockStore(baseState);
    const wrapper = await setup(store);
    wrapper.find('ul').at(0).find('button').at(1).simulate('click');
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[1]).toEqual(
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            baseState.router?.location?.pathname +
              `?viewType=${ViewTypes.Contracts}&clientId=1`,
          ],
          method: 'push',
        },
      },
    );
  });
});
