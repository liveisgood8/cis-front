import * as React from 'react';
import { useDispatch } from 'react-redux';
import { handleAxiosError } from '../../utils/axios';
import { Form, Button } from 'react-bootstrap';
import { IUser } from '../../stores/auth/types';
import { IClient, IContract } from '../../stores/business-entities/types';
import { fetchClients, fetchContracts } from '../../services/business-entities.service';
import { fetchUsers } from '../../services/user.service';
import { addRequest } from '../../services/business-requests.service';
import { addRequest as addRequestAction, increasePendingNumber } from '../../stores/business-requests/actions';
import { getAuthenticateData } from '../../services/auth.service';

export const AddRequestComponent: React.FC<{}> = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [clients, setClients] = React.useState<IClient[]>([]);
  const [contracts, setContracts] = React.useState<IContract[]>([]);
  const [isClientsLoading, setClientsLoading] = React.useState<boolean>(true);
  const [isContractsLoading, setContractsLoading] = React.useState<boolean>(true);
  const [isUsersLoading, setUsersLoading] = React.useState<boolean>(true);
  const [selectedContract, setSelectedContract] = React.useState<IContract>();
  const [selectedUser, setSelectedUser] = React.useState<IUser>();
  const [title, setTitle] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const dispatch = useDispatch();

  const updateContracts = React.useCallback(async (client: IClient): Promise<void> => {
    try {
      setContractsLoading(true);
      const contracts = await fetchContracts(client.id);
      setContracts(contracts);
      setContractsLoading(false);
      if (contracts.length) {
        setSelectedContract(contracts[0]);
      }
    } catch (err) {
      handleAxiosError(err, 'Не удалось получить список договоров');
    }
  }, []);

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const clients = await fetchClients();
        const users = await fetchUsers();
        setClients(clients);
        setUsers(users);
        setUsersLoading(false);
        setClientsLoading(false);
        if (clients.length) {
          updateContracts(clients[0]);
        }
        if (users.length) {
          setSelectedUser(users[0]);
        }
      } catch (err) {
        handleAxiosError(err, 'Не удалось получить список клиентов или пользователей');
      }
    })();
  }, [dispatch, updateContracts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const request = await addRequest({
        userId: selectedUser?.id as number,
        contractId: selectedContract?.id as number,
        title,
        message,
      });
      dispatch(addRequestAction(request));
      if (selectedUser && selectedUser.id === getAuthenticateData()?.user.id) {
        dispatch(increasePendingNumber());
      }
    } catch (err) {
      handleAxiosError(err, 'Не удалось добавить обращение');
    }
  };
  const onClientChange = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    const client = clients[+e.currentTarget.value];
    updateContracts(client);
  };

  const onContractChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const contract = contracts[+e.currentTarget.value];
    setSelectedContract(contract);
  };

  const onUserChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const user = users[+e.currentTarget.value];
    setSelectedUser(user);
  };

  const onMessageChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    e.currentTarget.style.height = '1px';
    e.currentTarget.style.height = (25 + e.currentTarget.scrollHeight) + 'px';
    setMessage(e.currentTarget.value);
  };

  return (
    <Form className="flex-grow-1" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicClient">
        <Form.Label>Связанный клиент</Form.Label>
        <Form.Control as="select"
          required
          onChange={onClientChange}>
          {isClientsLoading ? <option>Загрузка...</option> :
            clients.map((e, i) => (
              <option key={i} value={i}>{e.name}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicContract">
        <Form.Label>Связанный договор</Form.Label>
        <Form.Control as="select"
          required
          onChange={onContractChange}>
          {isContractsLoading ? <option>Загрузка...</option> :
            contracts.map((e, i) => (
              <option key={i} value={i}>{e.name}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicUser">
        <Form.Label>Связанный пользователь</Form.Label>
        <Form.Control as="select"
          required
          onChange={onUserChange}>
          {isUsersLoading ? <option>Загрузка...</option> :
            users.map((e, i) => (
              <option key={i} value={i}>{e.name}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formTitle">
        <Form.Label>Заголовок обращения</Form.Label>
        <Form.Control
          placeholder="Введите заголовок обращения"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setTitle(e.currentTarget.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formTitle">
        <Form.Label>Текст обращения</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Введите текст обращения"
          onChange={onMessageChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Зарегистрировать обращение
      </Button>
    </Form>
  );
};
