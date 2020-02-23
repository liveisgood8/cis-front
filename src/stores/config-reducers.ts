import { IAuthenticateState } from './auth/types';
import { combineReducers } from 'redux';
import { authenticateReducer } from './auth/reducer';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { IToastState } from './toast/types';
import { toastsReducer } from './toast/reducer';

export interface IApplicationState {
  router: RouterState;
  auth: IAuthenticateState;
  toasts: IToastState,
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authenticateReducer,
    toasts: toastsReducer,
  });
export default createRootReducer;
