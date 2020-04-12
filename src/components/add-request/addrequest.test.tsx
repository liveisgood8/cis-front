import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AddRequestComponent } from '.';
import { Form, Button } from 'react-bootstrap';
import { formEventMock } from '../../__mocks__/form-utils';
import * as be from '../../services/business-entities.service';
import * as usr from '../../services/user.service';
import * as req from '../../services/business-requests.service';
import { clientsMock, contractsMock, usersMock, requestsMock } from '../../__mocks__/entitites';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { act } from 'react-dom/test-utils';
import { addRequest } from '../../stores/business-requests/actions';

function tick(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('add request unit', () => {
  const store = mockStore<IApplicationState>({});

  const setup = async () => {
    const fetchClients = jest.fn().mockReturnValueOnce(Promise.resolve(clientsMock));
    const fetchContracts = jest.fn().mockReturnValueOnce(Promise.resolve(contractsMock));
    const fetchUsers = jest.fn().mockReturnValueOnce(Promise.resolve(usersMock));
    (be.fetchClients as any) = fetchClients;
    (be.fetchContracts as any) = fetchContracts;
    (usr.fetchUsers as any) = fetchUsers;

    const wrapper = mount(<Provider store={store}><AddRequestComponent /></Provider>);
    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });
    const groups = wrapper.find(Form.Group);
    expect(groups.length).toBe(5);

    const getFormGroup = (group: ReactWrapper) => {
      return {
        label: group.find(Form.Label),
        input: group.find(Form.Control),
      };
    };

    return {
      wrapper,
      formGroups: {
        client: getFormGroup(groups.at(0)),
        contract: getFormGroup(groups.at(1)),
        user: getFormGroup(groups.at(2)),
        title: getFormGroup(groups.at(3)),
        text: getFormGroup(groups.at(4)),
        submitButton: wrapper.find(Button),
      },
    };
  };

  it('raw render', async () => {
    const wrapper = await setup();

    expect(wrapper.formGroups.client.label.text()).toEqual('Связанный клиент');
    expect(wrapper.formGroups.client.input.prop('required')).toBeTruthy();
    expect(wrapper.formGroups.client.input.prop('as')).toEqual('select');
    expect(wrapper.formGroups.client.input.find('option').length)
      .toBe(2);

    expect(wrapper.formGroups.contract.label.text()).toEqual('Связанный договор');
    expect(wrapper.formGroups.contract.input.prop('required')).toBeTruthy();
    expect(wrapper.formGroups.contract.input.prop('as')).toEqual('select');
    expect(wrapper.formGroups.contract.input.find('option').length)
      .toBe(2);

    expect(wrapper.formGroups.user.label.text()).toEqual('Связанный пользователь');
    expect(wrapper.formGroups.user.input.prop('required')).toBeTruthy();
    expect(wrapper.formGroups.user.input.prop('as')).toEqual('select');
    expect(wrapper.formGroups.user.input.find('option').length)
      .toBe(2);

    expect(wrapper.formGroups.title.label.text()).toEqual('Заголовок обращения');
    expect(wrapper.formGroups.title.input.prop('required')).toBeTruthy();
    expect(wrapper.formGroups.title.input.prop('placeholder'))
      .toEqual('Введите заголовок обращения');

    expect(wrapper.formGroups.text.label.text()).toEqual('Текст обращения');
    expect(wrapper.formGroups.text.input.prop('required')).toBeTruthy();
    expect(wrapper.formGroups.text.input.prop('placeholder'))
      .toEqual('Введите текст обращения');

    expect(wrapper.formGroups.submitButton.text())
      .toEqual('Зарегистрировать обращение');
    expect(wrapper.formGroups.submitButton.prop('type')).toEqual('submit');
  });

  it('check submit after some change', async () => {
    const addRequestService = jest.fn().mockReturnValueOnce(Promise.resolve(requestsMock[0]));
    (req.addRequest as any) = addRequestService;

    const component = await setup();

    act(() => {
      component.formGroups.contract.input.props().onChange({ currentTarget: { value: 0 } });
      component.formGroups.user.input.props().onChange({ currentTarget: { value: 0 } });
      component.formGroups.title.input.props()
        .onChange({ currentTarget: { value: requestsMock[0].title } });
      component.formGroups.text.input.props()
        .onChange({ currentTarget: { value: requestsMock[0].message, style: { height: '10px' } } });
    });

    component.wrapper.find(Form).simulate('submit', formEventMock);
    await tick();

    expect(addRequestService.mock.calls.length).toBe(1);
    expect(addRequestService.mock.calls[0][0]).toEqual({
      userId: usersMock[0].id,
      contractId: contractsMock[0].id,
      title: requestsMock[0].title,
      message: requestsMock[0].message,
    });
    expect(store.getActions()).toEqual([
      {
        type: addRequest.toString(),
        payload: requestsMock[0],
      },
    ]);
  });
});
