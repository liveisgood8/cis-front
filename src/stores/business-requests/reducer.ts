import { createReducer } from '@reduxjs/toolkit';
import { IBusinessRequestsState } from './types';
import { decreasePendingNumber, setPendingNumber, setRequests } from './actions';

const initialState: IBusinessRequestsState = {
  pendingNumber: 0,
  requests: [],
};

export const businessRequestsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRequests, (state, action) => ({
      ...state,
      requests: action.payload,
    }))
    .addCase(setPendingNumber, (state, action) => ({
      ...state,
      pendingNumber: action.payload,
    }))
    .addCase(decreasePendingNumber, (state) => ({
      ...state,
      pendingNumber: state.pendingNumber - 1,
    }));
});
