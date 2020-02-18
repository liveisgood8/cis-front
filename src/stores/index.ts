import { IAuthenticateState } from './auth/types';
import { combineReducers } from 'redux';
import { authenticateReducer } from './auth/reducer';

export interface IApplicationState {
  auth: IAuthenticateState;
}

export const rootReducer = combineReducers<IApplicationState>({
  auth: authenticateReducer,
});
