import md5 from 'md5';
import { IAuthData } from '../stores/auth/types';
import { AxiosService } from './axios.service';

export function getAuthenticateData(): IAuthData | null {
  const authData = localStorage.getItem('authData');
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
}

export async function login(login: string, password: string): Promise<IAuthData> {
  const hashedPassword = md5(password);
  const response = await AxiosService.post('/auth/login', {
    login,
    password: hashedPassword,
  });
  const authData: IAuthData = response.data;
  localStorage.setItem('authData', JSON.stringify(authData));
  AxiosService.defaults.headers = {
    Authorization: `Bearer ${getAuthenticateData()?.accessToken}`,
  };
  return authData;
}

export async function register(
  login: string,
  password: string,
  name: string,
  surname: string,
  imageId: number,
): Promise<void> {
  const hashedPassword = md5(password);
  await AxiosService.post('/auth/register', {
    login,
    password: hashedPassword,
    name,
    surname,
    imageId,
  });
}

export function logout(): void {
  localStorage.removeItem('authData');
}

