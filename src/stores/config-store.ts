import configReducer, { IApplicationState } from './config-reducers';
import { History, createBrowserHistory } from 'history';
import { Store, createStore } from 'redux';

export const history: History = createBrowserHistory();

export default function configStore(
  initialState?: IApplicationState,
): Store<IApplicationState> {
  const store = createStore(
    configReducer(history),
    initialState,
  );
  return store;
}
