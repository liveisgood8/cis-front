import React from 'react';
import { mount } from 'enzyme';
import { TaskDetailsContainer, TaskDetailWithLoading } from '..';
import { createMemoryHistory, createLocation } from 'history';
import { match, Router } from 'react-router-dom';
import * as be from '../../../services/business-entities.service';
import { tasksMock } from '../../../__mocks__/entitites';
import { act } from '@testing-library/react';
import { ITask } from '../../../stores/business-entities/types';
import { NotFoundedPage } from '../../../pages/not-founded-page';

const history = createMemoryHistory();
const path = `/task/:id`;

const _match: match<{ id: string }> = {
  isExact: false,
  path,
  url: path.replace(':id', '1'),
  params: { id: '1' },
};

const location = createLocation(_match.url);

describe('task details container', () => {
  const setup = async (returnedTask?: ITask) => {
    const fetchSpecificTaskSpy = jest.spyOn(be, 'fetchSpecificTask')
      .mockResolvedValue(returnedTask);

    const wrapper = mount(
      <TaskDetailsContainer
        history={history}
        location={location}
        match={_match}
      />,
    );
    return {
      wrapper,
      fetchSpecificTaskSpy,
    };
  };

  it('loading state and fetch test', async () => {
    const { wrapper, fetchSpecificTaskSpy } = await setup(tasksMock[0]);
    await act(async () => {
      expect(wrapper.find(TaskDetailWithLoading).prop('isLoading'))
        .toBeTruthy();
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });
    expect(wrapper.find(TaskDetailWithLoading).prop('isLoading'))
      .toBeFalsy();
    expect(wrapper.find(TaskDetailWithLoading).prop('task'))
      .toEqual(tasksMock[0]);
    expect(fetchSpecificTaskSpy).toHaveBeenCalled();
    expect(fetchSpecificTaskSpy).toHaveBeenCalledWith(tasksMock[0].id);
  });

  it('when task not founded', async () => {
    const { wrapper } = await setup();
    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });
    expect(wrapper.find(NotFoundedPage).prop('text'))
      .toEqual('Задача не найдена');
  });
});
