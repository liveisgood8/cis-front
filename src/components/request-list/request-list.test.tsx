import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import RequestListComponent from '.';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { requestsMock } from '../../__mocks__/entitites';
import { act } from 'react-dom/test-utils';
import * as br from '../../services/business-requests.service';
import { Card, Accordion, Button } from 'react-bootstrap';
import { MockStore } from 'redux-mock-store';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('request list unit', () => {
  const setup = async (store: MockStore) => {
    const getAllSpy = jest.spyOn(br, 'getAll')
      .mockReturnValue(Promise.resolve(requestsMock));

    const wrapper = mount(
      <Provider store={store}>
        <RequestListComponent />
      </Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(getAllSpy).toHaveBeenCalled();
    return wrapper;
  };

  it('render requests', async () => {
    const store = mockStore<IApplicationState>({
      businessRequests: {
        requests: requestsMock,
      },
    });

    const wrapper = await setup(store);
    expect(wrapper.find(Card)).toHaveLength(2);

    const [firstRequest, secondRequest] = requestsMock;

    const firstCard = wrapper.find(Card).at(0);
    const firstCardBody = firstCard.find(Card.Body);
    expect(firstCard.find(Accordion.Toggle).text())
      .toEqual(firstRequest.title);
    expect(firstCardBody.find('h5').text())
      .toEqual('Текст обращения');
    expect(firstCardBody.find('p').text())
      .toEqual(firstRequest.message);
    expect(firstCardBody.find(Button).text())
      .toEqual('Обработать');

    const secondCard = wrapper.find(Card).at(1);
    const secondCardBody = secondCard.find(Card.Body);
    expect(secondCard.find(Accordion.Toggle).text())
      .toEqual(secondRequest.title);
    expect(secondCardBody.find('h5').text())
      .toEqual('Текст обращения');
    expect(secondCardBody.find('p').text())
      .toEqual(secondRequest.message);
    expect(secondCardBody.find(Button).text())
      .toEqual('Обработать');
  });

  it('render when requests is empty', async () => {
    const store = mockStore<IApplicationState>({
      businessRequests: {
        requests: [],
      },
    });

    const wrapper = await setup(store);
    expect(wrapper.find(FontAwesomeIcon).prop('icon')).toEqual(faCommentSlash);
    expect(wrapper.find('h4').text()).toEqual('Список обращений пуст');
  });
});
