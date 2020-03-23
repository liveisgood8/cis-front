import { AxiosService, serverBaseUrl } from './axios.service';
import { IUser } from '../stores/auth/types';

export async function fetchUsers(): Promise<IUser[]> {
  const response = await AxiosService.get('/users');
  return response.data;
}

export async function fetchUsersImageList(): Promise<string[]> {
  const response = await AxiosService.get('/users/profile-images');
  return response.data.map((e: string) => serverBaseUrl + e);
}
