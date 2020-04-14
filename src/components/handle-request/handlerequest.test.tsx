import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { HandleRequestComponent } from '.';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router-dom';
import * as br from '../../services/business-requests.service';
import { requestsMock } from '../../__mocks__/entitites';
import { act } from '@testing-library/react';
import { AxiosService } from '../../services/axios.service';
import { Form, Button } from 'react-bootstrap';
import { changeEventMock, formEventMock } from '../../__mocks__/form-utils';
import { decreasePendingNumber } from '../../stores/business-requests/actions';
import { push } from 'connected-react-router';


describe('handle request unit', () => {
  const store = mockStore<IApplicationState>({
    businessRequests: {
      pendingNumber: 0,
      requests: [],
    },
  });

  const history = createMemoryHistory();
  const path = `/handleRequest/:id`;

  const _match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params: { id: '1' },
  };

  const location = createLocation(_match.url);

  const setup = async () => {
    const getRequestSpy = jest.spyOn(br, 'getById');
    getRequestSpy.mockReturnValueOnce(Promise.resolve(requestsMock[0]));

    const wrapper = mount(
      <Provider store={store}>
        <HandleRequestComponent
          history={history}
          location={location}
          match={_match}
        />
      </Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const groups = wrapper.find(Form.Group);
    expect(groups.length).toBe(3);

    const submitButton = wrapper.find(Button);
    expect(submitButton.length).toBe(1);
    expect(submitButton.prop('type')).toEqual('submit');

    const destructFormGroup = (group: ReactWrapper) => {
      return {
        label: group.find(Form.Label),
        input: group.find(Form.Control),
      };
    };

    return {
      wrapper,
      form: {
        instance: wrapper.find(Form),
        email: destructFormGroup(groups.at(0)),
        subject: destructFormGroup(groups.at(1)),
        message: destructFormGroup(groups.at(2)),
        submitButton,
      },
    };
  };

  beforeEach(() => {
    store.clearActions();
  });

  it('raw render', async () => {
    const { wrapper, form } = await setup();

    expect(form.email.label.text()).toEqual('Электронный адрес клиента');
    expect(form.email.input.prop('type')).toEqual('email');
    expect(form.email.input.prop('required')).toBeTruthy();
    expect(form.email.input.prop('placeholder'))
      .toEqual('Введите электронный адрес клиента');

    expect(form.subject.label.text()).toEqual('Тема письма');
    expect(form.subject.input.prop('required')).toBeTruthy();
    expect(form.subject.input.prop('placeholder'))
      .toEqual('Введите тему письма');

    expect(form.message.label.text()).toEqual('Ответное сообщение');
    expect(form.message.input.prop('as')).toEqual('textarea');
    expect(form.message.input.prop('required')).toBeTruthy();
    expect(form.message.input.prop('placeholder'))
      .toEqual('Введите ответ клиенту');
  });

  it('submit form', async () => {
    const handleRequestSpy = jest.spyOn(br, 'handleBusinessRequest');
    handleRequestSpy.mockReturnValue(Promise.resolve());

    const { form } = await setup();

    const email = 'test@test.com';
    const subject = 'test msg subject';
    const body = 'test msg body';
    act(() => {
      form.email.input.props().onChange(changeEventMock(email));
      form.subject.input.props().onChange(changeEventMock(subject));
      form.message.input.props().onChange(changeEventMock(body));
    });

    form.instance.simulate('submit', formEventMock);
    await act(async () => {
      expect(form.submitButton.text()).toEqual('Обработка обращения...');
      await Promise.resolve();
      expect(form.submitButton.text()).toEqual('Отправить ответ');
    });

    expect(handleRequestSpy).toHaveBeenCalled();
    expect(handleRequestSpy.mock.calls[0][0]).toEqual(requestsMock[0].id);
    expect(handleRequestSpy.mock.calls[0][1]).toEqual(email);
    expect(handleRequestSpy.mock.calls[0][2]).toEqual({
      subject,
      body,
    });

    expect(store.getActions()).toEqual([
      {
        type: decreasePendingNumber.toString(),
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: [
            '/requests',
          ],
          method: 'push',
        },
      },
    ]);
  });
});
