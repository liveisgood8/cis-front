import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import { IApplicationState } from '../../../stores/config-reducers';
import { act } from '@testing-library/react';
import * as be from '../../../services/business-entities.service';
import { contractsMock } from '../../../__mocks__/entitites';
import { BaseEntitiesList } from '../base-entities';
import { mockStore } from '../../../__mocks__/store';
import { DeepPartial } from 'redux';
import { createLocation, createMemoryHistory } from 'history';
import { ViewTypes } from '..';
import { UserPermissions } from '../../../stores/permissions/types';
import { Router } from 'react-router-dom';
import SideBarContracts from '../contracts';

describe('side bar contracts list', () => {
  const baseState: DeepPartial<IApplicationState> = {
    router: {
      location: createLocation(`http://localhost?viewType=${ViewTypes.Contracts}&clientId=1`),
      action: 'POP',
    },
    permissions: {
      userPermissions: [UserPermissions.ADD_CONTRACTS],
    },
    businessEntities: {
      contracts: contractsMock,
    },
  };

  const setup = async (store: MockStore) => {
    const fetchContractsSpy = jest.spyOn(be, 'fetchContracts')
      .mockResolvedValue(contractsMock);

    const wrapper = mount(
      <Provider store={store}>
        <Router history={createMemoryHistory()}>
          <SideBarContracts />
        </Router>
      </Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(fetchContractsSpy).toHaveBeenCalled();
    expect(fetchContractsSpy).toHaveBeenCalledWith(1); // 1 - clientId in url
    return wrapper;
  };

  it('with add perm', async () => {
    const wrapper = await setup(mockStore<IApplicationState>(baseState));

    const addEntityComponent = shallow(wrapper.find(BaseEntitiesList)
      .prop('addEntityComponent') as any);
    expect(addEntityComponent.text())
      .toContain('Добавить договор');
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

  it('on contract click', async () => {
    const store = mockStore(baseState);
    const wrapper = await setup(store);
    wrapper.find('ul').at(1).find('button').at(0).simulate('click');
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[1]).toEqual(
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            baseState.router?.location?.pathname +
              `?viewType=${ViewTypes.Tasks}&clientId=1&contractId=${contractsMock[0].id}`,
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
              `?viewType=${ViewTypes.Clients}`,
          ],
          method: 'push',
        },
      },
    );
  });
});
