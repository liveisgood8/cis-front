import configReducer, { IApplicationState } from './config-reducers';
import { History, createBrowserHistory } from 'history';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const history: History = createBrowserHistory();

export default function configStore(
  initialState?: IApplicationState,
): Store<IApplicationState> {
  // const store = createStore(
  //   configReducer(history),
  //   initialState,
  //   applyMiddleware(thunk),
  // );
  const store = configureStore({
    reducer: configReducer(history),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [...getDefaultMiddleware(), thunk],
  });
  return store;
}
