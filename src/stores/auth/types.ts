export interface IUser {
  name: string;
}

export enum AuthenticateActionTypes {
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_FAIL = '@@auth/LOGIN_FAIL',
}

export interface ILoginRequestAction {
  type: AuthenticateActionTypes.LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  type: AuthenticateActionTypes.LOGIN_SUCCESS;
  user: IUser;
}

export interface ILoginFailAction {
  type: AuthenticateActionTypes.LOGIN_FAIL;
  errors: string;
}

export type AuthenticateActions = ILoginRequestAction | ILoginSuccessAction | ILoginFailAction;

export interface IAuthenticateState {
  readonly loggingIn: boolean;
  readonly user?: IUser;
  readonly errors?: string;
}


