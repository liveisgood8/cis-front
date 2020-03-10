import { IAuthData } from '../stores/auth/types';
import { AxiosService } from './axios.service';

export function getAuthenticateData(): IAuthData | null {
  const authData = localStorage.getItem('authData');
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
}

export async function login(username: string, password: string): Promise<IAuthData> {
  const response = await AxiosService.post('/auth/login', {
    login: username,
    password: password,
  });
  const authData: IAuthData = response.data;
  localStorage.setItem('authData', JSON.stringify(authData));
  AxiosService.defaults.headers = {
    Authorization: `Bearer ${getAuthenticateData()?.accessToken}`,
  };
  return authData;
}

export function logout(): void {
  localStorage.removeItem('authData');
}

