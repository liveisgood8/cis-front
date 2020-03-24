export interface IUser {
  id: number;
  login?: string;
  password?: string;
  name?: string;
  surname?: string;
  imageUrl: string;
}

export interface IAuthData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthenticateState {
  loggingIn: boolean;
  authData?: IAuthData;
  isRegistering: boolean;
}


