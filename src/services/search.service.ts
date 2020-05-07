import { IClient, IContract, ITask } from '../stores/business-entities/types';
import { IBusinessRequest } from '../stores/business-requests/types';
import { AxiosService } from './axios.service';

export async function makeSearch(
  scope: 'clients' | 'contracts' | 'tasks' | 'requests',
  query: string,
): Promise<IClient[] | IContract[] | ITask[] | IBusinessRequest[]> {
  const response = await AxiosService.get('/search', {
    params: {
      scope,
      query,
    },
  });
  return response.data;
}
