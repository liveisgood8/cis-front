import { IUser } from '../stores/auth/types';
import { AxiosService } from './axios.service';

export async function login(username: string, password: string): Promise<IUser> {
  const response = await AxiosService.post('/auth/login', {
    login: username,
    password: password,
  });
  const user: IUser = response.data;
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem('user');
}

export function getAuthenticatedUser(): IUser | null {
  const localStorageUser = localStorage.getItem('user');
  if (localStorageUser) {
    return JSON.parse(localStorageUser);
  }
  return null;
}
