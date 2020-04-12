import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import AddTaskComponent from '.';
import * as be from '../../services/business-entities.service';
import { clientsMock, contractsMock, tasksMock } from '../../__mocks__/entitites';
import { Form, Button } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import DatePicker from 'react-datepicker';
import { changeEventMock, formEventMock } from '../../__mocks__/form-utils';
import { addTaskAction, setClientsAction, setContractsAction } from '../../stores/business-entities/actions';

describe('add task unit', () => {
  const mockedStore = mockStore<IApplicationState>({
    businessEntities: {
      clients: clientsMock,
      contracts: contractsMock,
      tasks: [],
    },
  });

  const setup = async (store = mockedStore) => {
    const fetchClients = jest.spyOn(be, 'fetchClients');
    const fetchContracts = jest.spyOn(be, 'fetchContracts');
    fetchClients.mockReturnValueOnce(Promise.resolve(clientsMock));
    fetchContracts.mockReturnValueOnce(Promise.resolve(contractsMock));

    const wrapper = mount(
      <Provider store={store}><AddTaskComponent /></Provider>);

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(fetchClients).toHaveBeenCalled();
    expect(fetchContracts).toHaveBeenCalled();
    expect(fetchContracts.mock.calls[0][0]).toBe(clientsMock[0].id);

    const destructFormGroup = (group: ReactWrapper) => {
      return {
        label: group.find(Form.Label),
        input: group.find(Form.Control),
      };
    };

    expect(wrapper.contains(Form as any)).toBeTruthy();

    const formGroups = wrapper.find(Form.Group);
    expect(formGroups.length).toBe(5);

    const submitButton = wrapper.find(Button);
    expect(submitButton.length).toBe(1);

    return {
      wrapper,
      formInstance: wrapper.find(Form),
      form: {
        client: destructFormGroup(formGroups.at(0)),
        contract: destructFormGroup(formGroups.at(1)),
        name: destructFormGroup(formGroups.at(2)),
        doneTo: {
          label: formGroups.at(3).find(Form.Label),
          input: formGroups.at(3).find(DatePicker as any),
        },
        description: destructFormGroup(formGroups.at(4)),
        submitButton,
      },
    };
  };

  beforeEach(() => {
    mockedStore.clearActions();
  });

  it('raw render', async () => {
    const component = await setup();

    const form = component.form;
    expect(form.client.label.text()).toEqual('Связанный клиент');
    expect(form.client.input.prop('as')).toEqual('select');
    expect(form.client.input.prop('required')).toBeTruthy();
    expect(form.client.input.find('option').length).toBe(2);

    expect(form.contract.label.text()).toEqual('Связанный контракт');
    expect(form.contract.input.prop('as')).toEqual('select');
    expect(form.contract.input.prop('required')).toBeTruthy();
    expect(form.contract.input.find('option').length).toBe(2);

    expect(form.doneTo.label.text()).toEqual('Срок выполнения задачи');
    expect(form.doneTo.input.prop('placeholderText'))
      .toEqual('Выберите срок выполнения задачи');

    expect(form.name.label.text()).toEqual('Имя задачи');
    expect(form.name.input.prop('required')).toBeTruthy();
    expect(form.name.input.prop('placeholder')).toEqual('Введите имя');

    expect(form.description.label.text()).toEqual('Описание');
    expect(form.description.input.prop('as')).toEqual('textarea');
    expect(form.description.input.prop('rows')).toEqual('3');
  });

  it('on data change and confirm', async () => {
    const { wrapper, form, formInstance } = await setup();
    const task = tasksMock[0];

    const postTaskSpy = jest.spyOn(be, 'postTask');
    postTaskSpy.mockReturnValueOnce(Promise.resolve(task.id));

    act(() => {
      form.name.input.props().onChange(changeEventMock(task.name));
      form.doneTo.input.props().onChange(task.doneTo);
      form.description.input.props().onChange(changeEventMock(task.description));
    });

    formInstance.simulate('submit', formEventMock);
    await new Promise((resolve) => setImmediate(resolve));

    expect(postTaskSpy).toHaveBeenCalled();
    expect(postTaskSpy.mock.calls[0][0]).toEqual({
      contractId: contractsMock[0].id,
      ...task,
      contract: undefined,
      id: undefined,
    });

    expect(mockedStore.getActions()).toEqual([
      {
        type: setClientsAction.toString(),
        payload: clientsMock,
      },
      {
        type: setContractsAction.toString(),
        payload: contractsMock,
      },
      {
        type: addTaskAction.toString(),
        payload: {
          ...task,
          contract: contractsMock[0],
        },
      },
    ]);
  });
});
