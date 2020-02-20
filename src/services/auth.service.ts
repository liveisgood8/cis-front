import { IUser } from '../stores/auth/types';

export async function login(username: string, password: string): Promise<IUser> {
  const user: IUser = {
    name: 'user',
  };
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
