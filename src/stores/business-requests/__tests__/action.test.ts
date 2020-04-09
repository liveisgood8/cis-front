import { mockAxios } from '../../../__mocks__/axios-instance';
import { mockStore } from '../../../__mocks__/store';
import { IApplicationState } from '../../config-reducers';
import { fetchPendingNumber, setPendingNumber, fetchRequests, setRequests } from '../actions';
import { requestsMock } from '../../../__mocks__/entitites';

const axiosMock = mockAxios();
const store = mockStore<Pick<IApplicationState, 'businessRequests'>>({
  businessRequests: {
    pendingNumber: 0,
    requests: [],
  },
});

describe('business requests actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('fetch pending number', async () => {
    axiosMock.onGet('/business-requests/pending-number')
      .replyOnce(200, {
        pendingNumber: 154,
      });

    await store.dispatch(fetchPendingNumber());
    expect(store.getActions()).toStrictEqual([
      {
        type: setPendingNumber.toString(),
        payload: 154,
      },
    ]);
  });

  it('fetch requests', async () => {
    axiosMock.onGet('/business-requests')
      .replyOnce(200, requestsMock);

    await store.dispatch(fetchRequests());
    expect(store.getActions()).toStrictEqual([
      {
        type: setRequests.toString(),
        payload: requestsMock,
      },
    ]);
  });
});
