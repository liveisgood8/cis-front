import { createAction } from '@reduxjs/toolkit';
import { IClient, ITask, IContract } from './types';
import { AppThunkAction } from '../../types';
import { handleAxiosError } from '../../utils/axios';
import { fetchClients, fetchContracts, fetchTasks } from '../../services/business-entities.service';

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
  try {
    const clients = await fetchClients();
    dispatch(setClientsAction(clients));
  } catch (err) {
    handleAxiosError(err, 'Неизвестная ошибка при попытке получить список клиентов');
  }
};

export const getContractsAsync = (clientId: number): AppThunkAction<Promise<void>> =>
  async (dispatch): Promise<void> => {
    try {
      const contracts = await fetchContracts(clientId);
      dispatch(setContractsAction(contracts));
    } catch (err) {
      handleAxiosError(err, 'Неизвестная ошибка при попытке получить список договоров');
    }
  };


export const getTasksAsync = (contractId: number): AppThunkAction<Promise<void>> => async (dispatch): Promise<void> => {
  try {
    const tasks = await fetchTasks(contractId);
    dispatch(setTasksAction(tasks));
  } catch (err) {
    handleAxiosError(err, 'Неизвестная ошибка при попытке получить список задач');
  }
};