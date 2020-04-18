import { AxiosService } from './axios.service';
import { IClient, IContract, ITask } from '../stores/business-entities/types';
import { OmitId } from '../utils/types';

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

export async function fetchSpecificTask(taskId: number): Promise<ITask | undefined> {
  const response = await AxiosService.get(`/tasks/${taskId}`);
  if (response.status != 204) {
    return {
      ...(response.data as ITask),
      doneTo: new Date((response.data as ITask).doneTo),
    };
  }
}

export async function postClient(client: OmitId<IClient>): Promise<number> {
  const response = await AxiosService.post('/clients', client);
  return response.data;
}

export async function postContract(contract: OmitId<IContract> & {clientId: number}): Promise<number> {
  const response = await AxiosService.post('/contracts', contract);
  return response.data;
}

export async function postTask(task: OmitId<ITask> & {contractId: number}): Promise<number> {
  const response = await AxiosService.post('/tasks', task);
  return response.data;
}

export async function postContractCopyFile(copyFile: File): Promise<string> {
  const formData = new FormData();
  formData.append('contractCopyFile', copyFile);
  const result = await AxiosService.post('/contracts/uploadCopyFile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.contentPath;
}
