import { mockStore } from '../../../__mocks__/store';
import { IApplicationState } from '../../config-reducers';
import { mockAxios } from '../../../__mocks__/axios-instance';
import { UserPermissions } from '../types';
import { fetchPermissions, setPermissionsAction } from '../actions';

const axiosMock = mockAxios();
const store = mockStore<Pick<IApplicationState, 'permissions'>>({
  permissions: {
    userPermissions: [],
  },
});

describe('permissions actions', () => {
  it('fetch permissions', async () => {
    const expectedPermissions = [
      UserPermissions.ADD_CLIENTS,
      UserPermissions.ADD_TASKS,
    ] as UserPermissions[];

    axiosMock.onGet('/permissions')
      .replyOnce(200, expectedPermissions);

    await store.dispatch(fetchPermissions());
    expect(store.getActions())
      .toStrictEqual([
        {
          type: setPermissionsAction.toString(),
          payload: expectedPermissions,
        },
      ]);
  });
});
