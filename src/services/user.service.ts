import { AxiosService } from './axios.service';
import { IUser } from '../stores/auth/types';

export async function fetchUsers(): Promise<IUser[]> {
  const response = await AxiosService.get('/users');
  return response.data;
}