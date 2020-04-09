import { businessEntitiesReducer } from '../reducer';
import { IBusinessEntities } from '../types';
import { setClientsAction, setContractsAction, setTasksAction, addClientAction, addContractAction, addTaskAction } from '../actions';
import { clientsMock, contractsMock, tasksMock } from '../../../__mocks__/entitites';

const emptyState: IBusinessEntities = {
  clients: [],
  contracts: [],
  tasks: [],
};

describe('business entities reduces', () => {
  it('set clients handing', () => {
    expect(businessEntitiesReducer(emptyState, setClientsAction(clientsMock)))
      .toStrictEqual({
        ...emptyState,
        clients: clientsMock,
      });
  });

  it('set contracts handling', () => {
    expect(businessEntitiesReducer(emptyState, setContractsAction(contractsMock)))
      .toStrictEqual({
        ...emptyState,
        contracts: contractsMock,
      });
  });

  it('set tasks handling', () => {
    expect(businessEntitiesReducer(emptyState, setTasksAction(tasksMock)))
      .toStrictEqual({
        ...emptyState,
        tasks: tasksMock,
      });
  });

  it('add client action', () => {
    const defaultState = {
      ...emptyState,
      clients: [
        clientsMock[0],
      ],
    };
    expect(businessEntitiesReducer(defaultState, addClientAction(clientsMock[1])))
      .toStrictEqual({
        ...defaultState,
        clients: [
          ...defaultState.clients,
          clientsMock[1],
        ],
      });
  });

  it('add contract action', () => {
    const defaultState = {
      ...emptyState,
      contracts: [
        contractsMock[0],
      ],
    };
    expect(businessEntitiesReducer(defaultState, addContractAction(contractsMock[1])))
      .toStrictEqual({
        ...defaultState,
        contracts: [
          ...defaultState.contracts,
          contractsMock[1],
        ],
      });
  });

  it('add task action', () => {
    const defaultState = {
      ...emptyState,
      tasks: [
        tasksMock[0],
      ],
    };
    expect(businessEntitiesReducer(defaultState, addTaskAction(tasksMock[1])))
      .toStrictEqual({
        ...defaultState,
        tasks: [
          ...defaultState.tasks,
          tasksMock[1],
        ],
      });
  });
});
