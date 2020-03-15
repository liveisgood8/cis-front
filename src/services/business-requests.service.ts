import { AxiosService } from './axios.service';
import { IBusinessRequest } from '../stores/business-requests/types';

export async function getPendingNumber(): Promise<number> {
  const response = await AxiosService.get('/business-requests/pending-number');
  return response.data.pendingNumber;
}

export async function getAll(): Promise<IBusinessRequest[]> {
  const response = await AxiosService.get('/business-requests');
  return response.data;
}
