import thunk, { ThunkDispatch } from 'redux-thunk';
import { IApplicationState } from '../stores/config-reducers';
import { AnyAction } from 'redux';
import createMockStore from 'redux-mock-store';

type DispatchExtension = ThunkDispatch<IApplicationState, void, AnyAction>;
export function mockStore<S>(state: S) {
  return createMockStore<S, DispatchExtension>([thunk])(state);
}
