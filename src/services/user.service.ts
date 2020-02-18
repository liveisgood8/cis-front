import { IUser } from '../stores/auth/types';

export function login(username: string, password: string): IUser {
  return {
    name: 'user',
  };
}
