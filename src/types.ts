import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IApplicationState } from './stores/config-reducers';

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, IApplicationState, unknown, Action<string>>;

export enum Errors {
  UNKNOWN_ERROR = 1,
  PATH_NOT_FOUND,
  REQUEST_VALIDATE_ERROR,
  INSERT_ENTITY_ERROR,
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD,
}
