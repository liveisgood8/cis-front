import { IApplicationState } from '../../config-reducers';
import { UserPermissions } from '../types';
import { isHasPermissionSelectorFactory } from '../selectors';

test('is has permission selector', () => {
  const state = {
    permissions: {
      userPermissions: [
        UserPermissions.ADD_TASKS,
        UserPermissions.REGISTER_REQUEST,
      ],
    },
  } as IApplicationState;

  expect(isHasPermissionSelectorFactory(
    UserPermissions.ADD_TASKS)(state)).toBeTruthy();
  expect(isHasPermissionSelectorFactory(
    UserPermissions.REGISTER_REQUEST)(state)).toBeTruthy();
  expect(isHasPermissionSelectorFactory(
    UserPermissions.ADD_CONTRACTS)(state)).toBeFalsy();
});
