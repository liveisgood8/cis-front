import {
  setClientsAction,
  setContractsAction,
  setTasksAction,
  getClientsAsync,
  getContractsAsync,
  getTasksAsync,
} from '../actions';
import AxiosMock from 'axios-mock-adapter';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { IApplicationState } from '../../config-reducers';
import { AnyAction } from 'redux';
import { AxiosService } from '../../../services/axios.service';
import { clientsMock, contractsMock, tasksMock } from '../../../__mocks__/entitites';

type DispatchExtension = ThunkDispatch<IApplicationState, void, AnyAction>;
const mockStore = createMockStore<Pick<IApplicationState, 'businessEntities'>, DispatchExtension>([thunk]);
const axiosMock = new AxiosMock(AxiosService);

const mockedStore = mockStore({
  businessEntities: {
    clients: [],
    contracts: [],
    tasks: [],
  },
});

describe('business entities actions', () => {
  beforeEach(() => {
    mockedStore.clearActions();
  });

  it('setClients', () => {
    const expected = {
      type: setClientsAction.toString(),
      payload: clientsMock,
    };

    expect(setClientsAction(expected.payload)).toStrictEqual(expected);
  });

  it('setContracts', () => {
    const expected = {
      type: setContractsAction.toString(),
      payload: contractsMock,
    };

    expect(setContractsAction(expected.payload)).toStrictEqual(expected);
  });

  it('setTasks', () => {
    const expected = {
      type: setTasksAction.toString(),
      payload: tasksMock,
    };

    expect(setTasksAction(expected.payload)).toStrictEqual(expected);
  });

  it('get clients async', async () => {
    axiosMock.onGet('/clients').replyOnce(200, clientsMock);
    await mockedStore.dispatch(getClientsAsync());
    expect(mockedStore.getActions()).toStrictEqual([
      {
        type: setClientsAction.toString(),
        payload: clientsMock,
      },
    ]);
  });

  it('get contracts async', async () => {
    axiosMock.onGet('/contracts', {
      clientId: 234,
    }).replyOnce(200, contractsMock);
    await mockedStore.dispatch(getContractsAsync(234));
    expect(mockedStore.getActions()).toStrictEqual([
      {
        type: setContractsAction.toString(),
        payload: contractsMock,
      },
    ]);
  });

  it('get tasks async', async () => {
    axiosMock.onGet('/tasks', {
      contractId: 234,
    }).replyOnce(200, tasksMock);
    await mockedStore.dispatch(getTasksAsync(234));
    expect(mockedStore.getActions()).toStrictEqual([
      {
        type: setTasksAction.toString(),
        payload: tasksMock,
      },
    ]);
  });
});
