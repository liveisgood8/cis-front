import { createAction } from '@reduxjs/toolkit';
import { IClient, ITask, IContract } from './types';
import { AppThunkAction } from '../../types';
import { AxiosService } from '../../services/axios.service';
import { AxiosError } from 'axios';
import { addToastAction } from '../toast/actions';

export const setClientsAction = createAction<IClient[], '@@businessEntities/setClients'>(
  '@@businessEntities/setClients');
export const setContractsAction = createAction<IContract[], '@@businessEntities/setContracts'>(
  '@@businessEntities/setContracts');
export const setTasksAction = createAction<ITask[], '@@businessEntities/setTasks'>(
  '@@businessEntities/setTasks');

export const addClientAction = createAction<IClient, '@@businessEntities/addClient'>(
  '@@businessEntities/addClient');
export const addContractAction = createAction<IContract, '@@businessEntities/addContract'>(
  '@@businessEntities/addContract');
export const addTaskAction = createAction<ITask, '@@businessEntities/addTask'>(
  '@@businessEntities/addTask');

export const getClientsAsync = (): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  return AxiosService.get('/clients')
    .then((response) => {
      dispatch(setClientsAction(response.data));
    })
    .catch((err: AxiosError) => {
      dispatch(addToastAction({
        title: 'Ошибка при получении списка клиентов',
        message: err.response?.data.message ||
          'Неизвестная ошибка при попытке получить список клиентов',
        type: 'danger',
      }));
    });
};

export const getContractsAsync = (clientId: number): AppThunkAction<Promise<void>> =>
  async (dispatch): Promise<void> => {
    return AxiosService.get('/contracts', {
      params: {
        clientId,
      },
    })
      .then((response) => {
        dispatch(setContractsAction(response.data));
      })
      .catch((err: AxiosError) => {
        dispatch(addToastAction({
          title: 'Ошибка при получении списка клиентов',
          message: err.response?.data.message ||
            'Неизвестная ошибка при попытке получить список договоров',
          type: 'danger',
        }));
      });
  };

export const getTasksAsync = (contractId: number): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  return AxiosService.get('/tasks', {
    params: {
      contractId,
    },
  })
    .then((response) => {
      dispatch(setTasksAction(response.data));
    })
    .catch((err: AxiosError) => {
      dispatch(addToastAction({
        title: 'Ошибка при получении списка клиентов',
        message: err.response?.data.message ||
        'Неизвестная ошибка при попытке получить список задач',
        type: 'danger',
      }));
    });
};