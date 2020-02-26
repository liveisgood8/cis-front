import { createReducer } from '@reduxjs/toolkit';
import { IBusinessEntities } from './types';
import { setClientsAction, setContractsAction, setTasksAction, getEntitiesFailedAction } from './actions';

const initialState: IBusinessEntities = {
  clients: [],
  contracts: [],
  tasks: [],
};

export const businessEntitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setClientsAction, (state, action) => ({ ...state, clients: action.payload }))
    .addCase(setContractsAction, (state, action) => ({ ...state, contracts: action.payload }))
    .addCase(setTasksAction, (state, action) => ({ ...state, tasks: action.payload }))
    .addCase(getEntitiesFailedAction, (state, action) => ({ ...state, error: action.payload }));
});
