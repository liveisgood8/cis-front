import { AxiosService } from './axios.service';
import { IBusinessRequest } from '../stores/business-requests/types';

interface ICreateRequestObject {
  userId: number;
  contractId: number;
  title: string;
  message: string;
}

interface IRequestAnswer {
  subject: string;
  body: string;
}

export async function addRequest(request: ICreateRequestObject): Promise<IBusinessRequest> {
  const response = await AxiosService.post('/business-requests', request);
  return response.data;
}

export async function getPendingNumber(): Promise<number> {
  const response = await AxiosService.get('/business-requests/pending-number');
  return response.data.pendingNumber;
}

export async function getAll(): Promise<IBusinessRequest[]> {
  const response = await AxiosService.get('/business-requests');
  return response.data;
}

export async function getById(id: number): Promise<IBusinessRequest> {
  const response = await AxiosService.get('/business-requests', {
    params: {
      id,
    },
  });
  return response.data;
}

export async function handleBusinessRequest(
  requestId: number,
  clientEmail: string,
  answer: IRequestAnswer,
): Promise<void> {
  await AxiosService.patch('/business-requests', {
    requestId,
    email: clientEmail,
    answer,
  });
}
