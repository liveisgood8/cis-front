import { IUser, IAuthData } from '../stores/auth/types';
import { AxiosService } from './axios.service';

export async function login(username: string, password: string): Promise<IAuthData> {
  const response = await AxiosService.post('/auth/login', {
    login: username,
    password: password,
  });
  const authData: IAuthData = response.data;
  localStorage.setItem('authData', JSON.stringify(authData));
  return authData;
}

export function logout(): void {
  localStorage.removeItem('authData');
}

export function getAuthenticateData(): IUser | null {
  const authData = localStorage.getItem('authData');
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
}
