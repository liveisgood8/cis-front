import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IApplicationState } from './stores/config-reducers';

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, IApplicationState, unknown, Action<string>>;
