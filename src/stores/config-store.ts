import configReducer, { IApplicationState } from './config-reducers';
import { History, createBrowserHistory } from 'history';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

export const history: History = createBrowserHistory();

function configStore(
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
    middleware: [...getDefaultMiddleware(), routerMiddleware(history), thunk],
  });
  return store;
}

export const store = configStore();
