export interface IUser {
  name: string;
}

export interface IAuthenticateState {
  readonly loggingIn: boolean;
  readonly user?: IUser;
  readonly error?: string;
}


