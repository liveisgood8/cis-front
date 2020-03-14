import { createAction, ActionCreator } from '@reduxjs/toolkit';
import { AppThunkAction } from '../../types';
import { AxiosService } from '../../services/axios.service';
import { UserPermissions } from './types';

export const setPermissionsAction = createAction<UserPermissions[]>('@permissions/set');

export const fetchPermissions: ActionCreator<AppThunkAction<Promise<void>>> = () =>
  async (dispatch): Promise<void> => {
    try {
      const response = await AxiosService.get<UserPermissions[]>('/permissions');
      dispatch(setPermissionsAction(response.data));
    } catch (err) {
      console.error('Check rights error:', err);
    }
};
