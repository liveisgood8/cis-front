import React from 'react';
import { shallow, mount } from 'enzyme';
import AddClientComponent from '.';
import { Form, Button } from 'react-bootstrap';
import { formEventMock } from '../../__mocks__/form-utils';
import * as be from '../../services/business-entities.service';
import { IClient } from '../../stores/business-entities/types';
import { clientsMock } from '../../__mocks__/entitites';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { act, Simulate } from 'react-dom/test-utils';
import { addClientAction } from '../../stores/business-entities/actions';

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('add client unit', () => {
  it('raw render', () => {
    const wrapper = mount(<Provider store={mockStore({})}><AddClientComponent /></Provider>);

    const formGroups = wrapper.find(Form.Group);
    expect(formGroups.length).toBe(4);

    const clientGroup = formGroups.at(0);
    expect(clientGroup.find(Form.Label).text()).toEqual('Имя клиента');
    expect(clientGroup.find(Form.Control).prop('required')).toBeTruthy();
    expect(clientGroup.find(Form.Control).prop('placeholder')).toEqual('Введите имя');

    const emailGroup = formGroups.at(1);
    expect(emailGroup.find(Form.Label).text()).toEqual('Электронная почта');
    expect(emailGroup.find(Form.Control).prop('required')).toBeTruthy();
    expect(emailGroup.find(Form.Control).prop('type')).toEqual('email');
    expect(emailGroup.find(Form.Control).prop('placeholder'))
      .toEqual('Введите эл. адрес');

    const addressGroup = formGroups.at(2);
    expect(addressGroup.find(Form.Label).text()).toEqual('Юридический адрес');
    expect(addressGroup.find(Form.Control).prop('required')).toBeTruthy();
    expect(addressGroup.find(Form.Control).prop('placeholder'))
      .toEqual('Введите юр. адрес');

    const additionalGroup = formGroups.at(3);
    expect(additionalGroup.find(Form.Label).text()).toEqual('Примечание');
    expect(additionalGroup.find(Form.Control).prop('required')).toBeFalsy();
    expect(additionalGroup.find(Form.Control).prop('as')).toEqual('textarea');
    expect(additionalGroup.find(Form.Control).prop('rows')).toEqual('3');

    const submitButton = wrapper.find(Button);
    expect(submitButton.prop('type')).toEqual('submit');
    expect(submitButton.text()).toEqual('Добавить клиента');
  });

  it('check submit after some change', async () => {
    const postClientMock = jest.fn().mockReturnValueOnce(Promise.resolve(clientsMock[0].id));
    (be.postClient as any) = postClientMock;

    const mockedStore = mockStore<IApplicationState>({
      businessEntities: {
        clients: [],
      },
    });
    const wrapper = mount(<Provider store={mockedStore}><AddClientComponent /></Provider>);

    const controls = wrapper.find(Form.Control);
    act(() => {
      controls.at(0).props().onChange({ currentTarget: { value: clientsMock[0].name } });
      controls.at(1).props().onChange({ currentTarget: { value: clientsMock[0].email } });
      controls.at(2).props().onChange({ currentTarget: { value: clientsMock[0].address } });
      controls.at(3).props().onChange({ currentTarget: { value: clientsMock[0].comment } });
    });

    wrapper.find(Form).simulate('submit', formEventMock);

    await tick();

    expect(postClientMock.mock.calls.length).toBe(1);
    expect(postClientMock.mock.calls[0][0]).toEqual({
      ...clientsMock[0],
      id: undefined,
    } as Partial<IClient>);

    expect(mockedStore.getActions()).toStrictEqual([
      {
        type: addClientAction.toString(),
        payload: {
          id: clientsMock[0].id,
          name: clientsMock[0].name,
          comment: clientsMock[0].comment,
        },
      },
    ]);
  });
});
