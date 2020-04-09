import { IBusinessRequestsState } from '../types';
import { requestsMock } from '../../../__mocks__/entitites';
import { businessRequestsReducer } from '../reducer';
import { addRequest, setRequests, setPendingNumber, increasePendingNumber, decreasePendingNumber } from '../actions';

describe('business requests reducer', () => {
  const emptyState: IBusinessRequestsState = {
    pendingNumber: 0,
    requests: [],
  };

  it('add request', () => {
    const state = {
      ...emptyState,
      requests: [
        ...emptyState.requests,
        requestsMock[0],
      ],
    };
    expect(businessRequestsReducer(state, addRequest(requestsMock[1])))
      .toStrictEqual({
        ...state,
        requests: requestsMock,
      });
  });

  it('set requests', () => {
    expect(businessRequestsReducer(emptyState, setRequests(requestsMock)))
      .toStrictEqual({
        ...emptyState,
        requests: requestsMock,
      });
  });

  it('set pending number', () => {
    expect(businessRequestsReducer(emptyState, setPendingNumber(3213)))
      .toStrictEqual({
        ...emptyState,
        pendingNumber: 3213,
      });
  });

  it('increase pending number', () => {
    expect(businessRequestsReducer(emptyState, increasePendingNumber()))
      .toStrictEqual({
        ...emptyState,
        pendingNumber: 1,
      });
  });

  it('decrease pending number', () => {
    const state = {
      ...emptyState,
      pendingNumber: 12,
    };
    expect(businessRequestsReducer(state, decreasePendingNumber()))
      .toStrictEqual({
        ...state,
        pendingNumber: 11,
      });
  });
});
