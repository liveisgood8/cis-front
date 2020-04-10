import { ITask, IContract, IClient } from '../stores/business-entities/types';
import { IBusinessRequest } from '../stores/business-requests/types';
import { IUser } from '../stores/auth/types';

export const userMock = {
  id: 1,
  login: 'user_test_login',
  password: 'some_strong_pass',
  name: 'user name',
  surname: 'user surname',
  imageUrl: 'http://image',
} as IUser;

export const clientsMock = [
  {
    id: 1,
    name: 'test name',
    address: 'addr',
    comment: 'comment',
    email: 'email',
  },
  {
    id: 2,
    name: 'test name',
    address: 'addr',
    comment: 'comment',
    email: 'email',
  },
] as IClient[];

export const contractsMock = [
  {
    id: 1,
    conclusionDate: new Date(),
    name: 'name',
    client: {
      id: 2,
    },
    comment: 'comment',
    copyPath: 'copyPath',
  },
  {
    id: 2,
    conclusionDate: new Date(),
    name: 'name',
    client: {
      id: 3,
    },
    comment: 'comment',
    copyPath: 'copyPath',
  },
] as IContract[];

export const tasksMock = [
  {
    id: 1,
    name: 'name',
    description: 'descr',
    doneTo: new Date(),
    contract: {
      id: 1,
    },
  },
  {
    id: 2,
    name: 'name',
    description: 'descr',
    doneTo: new Date(),
    contract: {
      id: 1,
    },
  },
] as ITask[];

export const requestsMock = [
  {
    id: 1,
    message: 'msg 1',
    title: 'title 1',
    contract: contractsMock[0],
  },
  {
    id: 2,
    message: 'msg2',
    title: 'title 2',
    contract: contractsMock[1],
  },
] as IBusinessRequest[];
