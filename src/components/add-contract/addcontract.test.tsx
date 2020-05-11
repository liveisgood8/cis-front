import React, { SyntheticEvent } from 'react';
import { mount } from 'enzyme';
import { AddContractComponent } from '.';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { formEventMock } from '../../__mocks__/form-utils';
import * as be from '../../services/business-entities.service';
import { IContract } from '../../stores/business-entities/types';
import { clientsMock, contractsMock } from '../../__mocks__/entitites';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { act } from 'react-dom/test-utils';
import { addContractAction, setClientsAction } from '../../stores/business-entities/actions';

function tick(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('add contract unit', () => {
  const store = mockStore<IApplicationState>({
    businessEntities: {
      clients: [],
    },
  });

  it('raw render', () => {
    const wrapper = mount(<Provider store={store}><AddContractComponent /></Provider>);

    const formGroups = wrapper.find(Form.Group);
    expect(formGroups.length).toBe(5);

    const clientGroup = formGroups.at(0);
    expect(clientGroup.find(Form.Label).text()).toEqual('Связанный клиент');
    expect(clientGroup.find(Form.Control).prop('required')).toBeTruthy();
    expect(clientGroup.find(Form.Control).prop('as')).toEqual('select');

    const contractGroup = formGroups.at(1);
    expect(contractGroup.find(Form.Label).text()).toEqual('Имя договора');
    expect(contractGroup.find(Form.Control).prop('required')).toBeTruthy();
    expect(contractGroup.find(Form.Control).prop('placeholder'))
      .toEqual('Введите имя');

    const dateGroup = formGroups.at(2);
    expect(dateGroup.find(Form.Label).text()).toEqual('Дата подписания договора');
    expect(dateGroup.contains(DatePicker as any)).toBeTruthy();

    const additionalGroup = formGroups.at(3);
    expect(additionalGroup.find(Form.Label).text()).toEqual('Примечание');
    expect(additionalGroup.find(Form.Control).prop('required')).toBeFalsy();
    expect(additionalGroup.find(Form.Control).prop('as')).toEqual('textarea');
    expect(additionalGroup.find(Form.Control).prop('rows')).toEqual('3');

    const copyFileGroup = formGroups.at(4);
    expect(copyFileGroup.find(Form.Label).text()).toEqual('Выберите копию договора');
    expect(copyFileGroup.find(Form.Control).prop('required')).toBeTruthy();
    expect(copyFileGroup.find(Form.Control).prop('type')).toEqual('file');

    const submitButton = wrapper.find(Button);
    expect(submitButton.prop('type')).toEqual('submit');
    expect(submitButton.text()).toEqual('Добавить договор');
  });

  it('check submit after some change', async () => {
    const postContract = jest.fn().mockReturnValueOnce(Promise.resolve(contractsMock[0].id));
    const fetchClients = jest.fn().mockReturnValueOnce(Promise.resolve(clientsMock));
    const postContractCopyFile = jest.fn().mockReturnValueOnce(Promise.resolve(contractsMock[0].copyPath));
    (be.postContract as any) = postContract;
    (be.fetchClients as any) = fetchClients;
    (be.postContractCopyFile as any) = postContractCopyFile;

    const mockedStore = mockStore<IApplicationState>({
      businessEntities: {
        clients: clientsMock,
      },
    });

    const wrapper = mount(<Provider store={mockedStore}><AddContractComponent /></Provider>);
    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const controls = wrapper.find(Form.Control);
    act(() => {
      controls.at(0).props().onChange({ currentTarget: { value: clientsMock[0].name } });
      controls.at(1).props().onChange({ currentTarget: { value: contractsMock[0].name } });
      wrapper.find(DatePicker).props().onChange(contractsMock[0].conclusionDate, {} as SyntheticEvent);
      controls.at(2).props().onChange({ currentTarget: { value: clientsMock[0].comment } });
    });

    wrapper.find(Form).simulate('submit', formEventMock);

    await tick();

    expect(postContract.mock.calls.length).toBe(1);
    expect(fetchClients.mock.calls.length).toBe(1);
    expect(postContractCopyFile.mock.calls.length).toBe(1);
    expect(postContract.mock.calls[0][0]).toEqual({
      clientId: clientsMock[0].id,
      name: contractsMock[0].name,
      conclusionDate: contractsMock[0].conclusionDate,
      comment: contractsMock[0].comment,
      copyPath: contractsMock[0].copyPath,
    } as Partial<IContract>);

    expect(mockedStore.getActions()).toEqual([
      {
        type: setClientsAction.toString(),
        payload: clientsMock,
      },
      {
        type: addContractAction.toString(),
        payload: {
          ...contractsMock[0],
          client: clientsMock[0],
          copyPath: undefined,
        } as IContract,
      },
    ]);
  });
});
