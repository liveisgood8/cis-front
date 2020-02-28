import { createAction } from '@reduxjs/toolkit';
import { IClient, ITask, IContract } from './types';
import { AppThunkAction } from '../../types';
import { AxiosService } from '../../services/axios.service';
import { AxiosError } from 'axios';

export const setClientsAction = createAction<IClient[], '@@businessEntities/setClients'>(
  '@@businessEntities/setClients');
export const setContractsAction = createAction<IContract[], '@@businessEntities/setContracts'>(
  '@@businessEntities/setContracts');
export const setTasksAction = createAction<ITask[], '@@businessEntities/setTasks'>(
  '@@businessEntities/setTasks');
export const getEntitiesFailedAction = createAction<string, '@@businessEntities/getEntitiesError'>(
  '@@businessEntities/getEntitiesError');

export const getClientsAsync = (): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  return AxiosService.get('/clients/all')
    .then((response) => {
      dispatch(setClientsAction(response.data));
    })
    .catch((err: AxiosError) => {
      dispatch(getEntitiesFailedAction(err.response?.data ||
        'Неизвестная ошибка при попытке получить список клиентов'));
    });
};

export const getContractsAsync = (clientId: number): AppThunkAction<Promise<void>> =>
  async (dispatch): Promise<void> => {
    return AxiosService.get('/contracts/all', {
      params: {
        clientId,
      },
    })
      .then((response) => {
        dispatch(setContractsAction(response.data));
      })
      .catch((err: AxiosError) => {
        dispatch(getEntitiesFailedAction(err.response?.data ||
          'Неизвестная ошибка при попытке получить список договоров'));
      });
};

export const getTasksAsync = (contractId: number): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  return AxiosService.get('/tasks/all', {
    params: {
      contractId,
    },
  })
    .then((response) => {
      dispatch(setTasksAction(response.data));
    })
    .catch((err: AxiosError) => {
      dispatch(getEntitiesFailedAction(err.response?.data ||
        'Неизвестная ошибка при попытке получить список задач'));
    });
};