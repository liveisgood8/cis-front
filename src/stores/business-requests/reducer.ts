import { createReducer } from '@reduxjs/toolkit';
import { IBusinessRequestsState } from './types';
import { decreasePendingNumber, setPendingNumber, setRequests, addRequest, increasePendingNumber } from './actions';

const initialState: IBusinessRequestsState = {
  pendingNumber: 0,
  requests: [],
};

export const businessRequestsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addRequest, (state, action) => ({
      ...state,
      requests: state.requests.concat(action.payload),
    }))
    .addCase(setRequests, (state, action) => ({
      ...state,
      requests: action.payload,
    }))
    .addCase(setPendingNumber, (state, action) => ({
      ...state,
      pendingNumber: action.payload,
    }))
    .addCase(increasePendingNumber, (state) => ({
      ...state,
      pendingNumber: state.pendingNumber + 1,
    }))
    .addCase(decreasePendingNumber, (state) => ({
      ...state,
      pendingNumber: state.pendingNumber - 1,
    }));
});
