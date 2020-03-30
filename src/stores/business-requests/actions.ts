import { createAction } from '@reduxjs/toolkit';
import { AppThunkAction } from '../../types';
import { getPendingNumber, getAll } from '../../services/business-requests.service';
import { handleAxiosError } from '../../utils/axios';
import { IBusinessRequest } from './types';

export const addRequest = createAction<IBusinessRequest>('@@business-requests/addRequest');
export const setRequests = createAction<IBusinessRequest[]>('@@business-requests/setRequests');
export const setPendingNumber = createAction<number>('@@business-requests/setPendingNumber');
export const increasePendingNumber = createAction<void>('@@business-requests/increasePendingNumber');
export const decreasePendingNumber = createAction<void>('@@business-requests/decreasePendingNumber');

export const fetchPendingNumber = (): AppThunkAction<Promise<void>> => async (dispatch) => {
  try {
    const pendingNumber = await getPendingNumber();
    dispatch(setPendingNumber(pendingNumber));
  } catch (err) {
    handleAxiosError(err, 'Не удалось получить количество ожидающих обработку обращений');
  }
};

export const fetchRequests = (): AppThunkAction<Promise<void>> => async (dispatch) => {
  try {
    const requests = await getAll();
    dispatch(setRequests(requests));
  } catch (err) {
    handleAxiosError(err, 'Не удалось получить список обращений');
  }
};
