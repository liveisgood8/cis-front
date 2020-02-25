export interface IUser {
  name: string;
}

export interface IAuthData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthenticateState {
  readonly loggingIn: boolean;
  readonly authData?: IAuthData;
  readonly error?: string;
}


