import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import { IApplicationState } from '../../../stores/config-reducers';
import SideBarClients from '../clients';
import { act } from '@testing-library/react';
import * as be from '../../../services/business-entities.service';
import { clientsMock } from '../../../__mocks__/entitites';
import { BaseEntitiesList } from '../base-entities';
import { mockStore } from '../../../__mocks__/store';
import { DeepPartial } from 'redux';
import { createLocation, createMemoryHistory } from 'history';
import { ViewTypes } from '..';
import { UserPermissions } from '../../../stores/permissions/types';
import { Router } from 'react-router-dom';

describe('side bar clienst list', () => {
  const baseState: DeepPartial<IApplicationState> = {
    router: {
      location: createLocation(`http://localhost?viewType=${ViewTypes.Clients}`),
      action: 'POP',
    },
    permissions: {
      userPermissions: [UserPermissions.ADD_CLIENTS],
    },
    businessEntities: {
      clients: clientsMock,
    },
  };

  const setup = async (store: MockStore) => {
    const fetchClientsSpy = jest.spyOn(be, 'fetchClients')
      .mockResolvedValue(clientsMock);

    const wrapper = mount(
      <Provider store={store}>
        <Router history={createMemoryHistory()}>
          <SideBarClients />
        </Router>
      </Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(fetchClientsSpy).toHaveBeenCalled();
    return wrapper;
  };

  it('with add perm', async () => {
    const wrapper = await setup(mockStore<IApplicationState>(baseState));

    const addEntityComponent = shallow(wrapper.find(BaseEntitiesList)
      .prop('addEntityComponent') as any);
    expect(addEntityComponent.text())
      .toContain('Добавить клиента');
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

  it('on client click', async () => {
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
              `?viewType=${ViewTypes.Contracts}&clientId=${clientsMock[0].id}`,
          ],
          method: 'push',
        },
      },
    );
  });
});
