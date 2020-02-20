import { IAuthenticateState } from './auth/types';
import { combineReducers } from 'redux';
import { authenticateReducer } from './auth/reducer';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

export interface IApplicationState {
  router: RouterState;
  auth: IAuthenticateState;
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authenticateReducer,
  });
export default createRootReducer;
