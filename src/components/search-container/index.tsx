import React, { useEffect, useState } from 'react';
import { IClient, IContract, ITask } from '../../stores/business-entities/types';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { makeSearch } from '../../services/search.service';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../stores/config-reducers';
import { toast } from 'react-toastify';
import { KeyValueCard } from '../key-value-card';

export const SearchContainer: React.FC = () => {
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

  return (
    <div className="flex-grow-1">
      {clients.map((e, i) => (
        <KeyValueCard key={i} title={e.name} values={{
          'Электронный адрес': e.email as string,
          'Физический адрес': e.address as string,
          'sep': '---',
          'Комментарий': e.comment as string,
        }} />
      ))}
      {contracts.map((e, i) => (
        <KeyValueCard key={i} title={e.name} values={{
          'Дата заключения': new Date(e.conclusionDate).toLocaleDateString(),
          'sep': '---',
          'Комментарий': e.comment as string,
        }} />
      ))}
      {tasks.map((e, i) => (
        <KeyValueCard key={i} title={e.name} values={{
          'Выполнить до': new Date(e.doneTo).toLocaleDateString(),
          'sep': '---',
          'Описание': e.description as string,
        }} />
      ))}
      {requests.map((e, i) => (
        <KeyValueCard key={i} title={e.title} values={{
          'Сообщение': e.message,
        }} />
      ))}
    </div>
  );
};
