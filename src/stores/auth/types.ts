export interface IUser {
  name: string;
}

export enum AuthenticateActionTypes {
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_FAIL = '@@auth/LOGIN_FAIL',
}

export interface IAuthenticateState {
  readonly loggingIn: boolean;
  readonly user?: IUser;
  readonly error?: Error;
}


