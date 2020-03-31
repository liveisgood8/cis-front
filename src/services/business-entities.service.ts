import { AxiosService } from './axios.service';
import { IClient, IContract, ITask } from '../stores/business-entities/types';

export async function fetchClients(): Promise<IClient[]> {
  const response = await AxiosService.get('/clients');
  return response.data;
}

export async function fetchContracts(clientId: number): Promise<IContract[]> {
  const response = await AxiosService.get('/contracts', {
    params: {
      clientId,
    },
  });
  return response.data;
}

export async function fetchTasks(contractId: number): Promise<ITask[]> {
  const response = await AxiosService.get('/tasks', {
    params: {
      contractId,
    },
  });
  return response.data;
}

export async function fetchSpecificTask(taskId: number): Promise<ITask> {
  const response = await AxiosService.get('/tasks', {
    params: {
      id: taskId,
    },
  });
  return {
    ...(response.data as ITask),
    doneTo: new Date((response.data as ITask).doneTo),
  };
}
