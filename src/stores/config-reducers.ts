import { IAuthenticateState } from './auth/types';
import { combineReducers } from 'redux';
import { authenticateReducer } from './auth/reducer';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { IToastState } from './toast/types';
import { toastsReducer } from './toast/reducer';
import { IBusinessEntities } from './business-entities/types';
import { businessEntitiesReducer } from './business-entities/reducer';
import { ISideBarState } from './side-bar/types';
import { sideBarReducer } from './side-bar/reducer';

export interface IApplicationState {
  router: RouterState;
  auth: IAuthenticateState;
  businessEntities: IBusinessEntities;
  sideBar: ISideBarState;
  toasts: IToastState;
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authenticateReducer,
    businessEntities: businessEntitiesReducer,
    sideBar: sideBarReducer,
    toasts: toastsReducer,
  });
export default createRootReducer;
