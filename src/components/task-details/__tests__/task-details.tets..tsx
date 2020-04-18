import React from 'react';
import { shallow } from 'enzyme';
import { TaskDetails } from '..';
import { tasksMock } from '../../../__mocks__/entitites';
import { Card } from 'react-bootstrap';

test('task details render test', () => {
  const task = tasksMock[0];
  const wrapper = shallow(<TaskDetails
    task={task}
  />);

  expect(wrapper.find(Card.Header).find('h3').text())
    .toEqual('Информация о задаче');

  const body = wrapper.find(Card.Body);
  expect(body.find('div').at(0).find('strong').text())
    .toEqual('Имя задачи:');
  expect(body.find('div').at(0).find('span').text())
    .toEqual(task.name);

  expect(body.find('div').at(1).find('strong').text())
    .toEqual('Клиент:');
  expect(body.find('div').at(1).find('span').text())
    .toEqual('');

  expect(body.find('div').at(2).find('strong').text())
    .toEqual('Договор:');
  expect(body.find('div').at(2).find('span').text())
    .toEqual('');

  expect(body.find('div').at(3).find('strong').text())
    .toEqual('Выполнить до:');
  expect(body.find('div').at(3).find('span').text())
    .toEqual(task.doneTo.toLocaleDateString());

  expect(body.find('div').at(4).find('strong').text())
    .toEqual('Описание:');
  expect(body.find('div').at(4).find('span').text())
    .toEqual(task.description);
});
