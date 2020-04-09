import { IPermissionsState, UserPermissions } from '../types';
import { permissionsReducer } from '../reducer';
import { setPermissionsAction } from '../actions';

describe('permissions reducer', () => {
  it('set permissions', () => {
    const state: IPermissionsState = {
      userPermissions: [],
    };
    const expectedPermissions: UserPermissions[] = [
      UserPermissions.ADD_CONTRACTS,
    ];
    expect(permissionsReducer(state, setPermissionsAction(expectedPermissions)))
      .toStrictEqual({
        ...state,
        userPermissions: expectedPermissions,
      });
  });
});
