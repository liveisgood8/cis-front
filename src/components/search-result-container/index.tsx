import React, { useEffect, useState } from 'react';
import { IClient, IContract, ITask } from '../../stores/business-entities/types';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { makeSearch } from '../../services/search.service';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../stores/config-reducers';
import { toast } from 'react-toastify';
import { KeyValueCard } from '../key-value-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

export const SearchResultContainer: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [requests, setRequests] = useState<IBusinessRequest[]>([]);
  const locationSearch = useSelector((state: IApplicationState) => state.router.location.search);

  useEffect(() => {
    const searchQuery = new URLSearchParams(locationSearch).get('query');
    if (!searchQuery) {
      return;
    }

    (async (): Promise<void> => {
      try {
        setClients(await makeSearch('clients', searchQuery) as IClient[]);
        setContracts(await makeSearch('contracts', searchQuery) as IContract[]);
        setTasks(await makeSearch('tasks', searchQuery) as ITask[]);
        setRequests(await makeSearch('requests', searchQuery) as IBusinessRequest[]);
      } catch (err) {
        toast.error('Ошибка при поиске:' + err.message);
      }
    })();
  }, [locationSearch]);

  const isSearchResultEmpty = (): boolean => {
    return !clients.length && !contracts.length && !tasks.length && !requests.length;
  };

  return (
    <div className="flex-grow-1">
      {clients.map((e, i) => (
        <KeyValueCard key={i} title={'Клиент: ' + e.name} values={{
          'Электронный адрес': e.email,
          'Физический адрес': e.address,
          'sep': '---',
          'Комментарий': e.comment,
        }} />
      ))}
      {contracts.map((e, i) => (
        <KeyValueCard key={i} title={'Договор: ' + e.name} values={{
          'Клиент': e.client?.name,
          'sep': '---',
          'Дата заключения': new Date(e.conclusionDate).toLocaleDateString(),
          'sep1': '---',
          'Комментарий': e.comment,
        }} />
      ))}
      {tasks.map((e, i) => (
        <KeyValueCard key={i} title={'Задача: ' + e.name} values={{
          'Имя задачи': e.name,
          'sep': '---',
          'Клиент': e.contract?.client?.name,
          'Договор': e.contract?.name,
          'sep1': '---',
          'Выполнить до': new Date(e.doneTo).toLocaleDateString(),
          'Описание': e.description,
        }} />
      ))}
      {requests.map((e, i) => (
        <KeyValueCard key={i} title={'Обращение: ' + e.title} values={{
          'Клиент': e.contract?.client?.name,
          'Договор': e.contract?.name,
          'sep': '---',
          'Сообщение': e.message,
        }} />
      ))}
      {isSearchResultEmpty() &&
        <div className="d-flex justify-content-center align-items-center h-100">
          <div style={{ fontSize: '1.5em' }}>
            <FontAwesomeIcon className="mr-2" color="#7386D5" icon={faFrown} />
            <span>По вашему запросу ничего не найдено!</span>
          </div>
        </div>
      }
    </div>
  );
};
