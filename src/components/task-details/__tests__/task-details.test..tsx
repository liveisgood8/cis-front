import React from 'react';
import { mount } from 'enzyme';
import { TaskDetails } from '..';
import { tasksMock } from '../../../__mocks__/entitites';
import { Card } from 'react-bootstrap';
import { KeyValueCard } from '../../key-value-card';

test('task details render test', () => {
  const task = tasksMock[0];
  const wrapper = mount(<TaskDetails
    task={task}
  />);

  expect(wrapper.exists(KeyValueCard));
  const keyValueCard = wrapper.find(KeyValueCard);

  expect(keyValueCard.find('h5').text())
    .toEqual('Информация о задаче');

  const bodyWrapper = keyValueCard.find(Card.Body).find('div').at(0);
  expect(bodyWrapper.hasClass('card-body')).toBeTruthy();

  const body = bodyWrapper.children();

  expect(body.find('div').at(0).find('strong').text())
    .toEqual('Имя задачи:');
  expect(body.find('div').at(0).find('span').text())
    .toEqual(task.name);

  expect(body.find('div').at(1).find('strong').text())
    .toEqual('Выполнить до:');
  expect(body.find('div').at(1).find('span').text())
    .toEqual(task.doneTo.toLocaleDateString());

  expect(body.find('div').at(2).find('strong').text())
    .toEqual('Описание:');
  expect(body.find('div').at(2).find('span').text())
    .toEqual(task.description);
});
