import { AxiosService, serverBaseUrl } from './axios.service';
import { IUser } from '../stores/auth/types';
import { getAuthenticateData, setAuthenticateData } from './auth.service';
import md5 from 'md5';

export async function fetchUsers(): Promise<IUser[]> {
  const response = await AxiosService.get('/users');
  return response.data;
}

export async function updateUser(user: IUser): Promise<void> {
  if (user.password) {
    user = {
      ...user,
      password: md5(user.password),
    };
  }
  await AxiosService.patch('/users', user);
  const authData = getAuthenticateData();
  if (authData) {
    authData.user = user;
    setAuthenticateData(authData);
  }
}

export async function fetchUsersImageList(): Promise<string[]> {
  const response = await AxiosService.get('/users/profile-images');
  return response.data.map((e: string) => serverBaseUrl + e);
}
