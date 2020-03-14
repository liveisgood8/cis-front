import { createSelector } from '@reduxjs/toolkit';
import { IApplicationState } from '../config-reducers';
import { UserPermissions } from './types';

export const isHasPermissionSelectorFactory = (permissionId: UserPermissions) => {
  return createSelector<IApplicationState, UserPermissions[], boolean>(
    (state) => state.permissions.userPermissions,
    (permissions) => permissions.find((e) => e === permissionId) !== undefined,
  );
};
