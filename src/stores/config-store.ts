import configReducer, { IApplicationState } from './config-reducers';
import { History, createBrowserHistory } from 'history';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const history: History = createBrowserHistory();

export default function configStore(
  initialState?: IApplicationState,
): Store<IApplicationState> {
  const store = createStore(
    configReducer(history),
    initialState,
    applyMiddleware(thunk),
  );
  return store;
}
