export interface IUser {
  name: string;
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


