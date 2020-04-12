import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { getContractsAsync, getClientsAsync, addTaskAction } from '../../stores/business-entities/actions';
import { IContract, IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { toast } from 'react-toastify';
import { handleAxiosError } from '../../utils/axios';
import { postTask } from '../../services/business-entities.service';

const AddTaskComponent: React.FC = () => {
  const clients = useSelector((state: IApplicationState) => state.businessEntities.clients);
  const contracts = useSelector((state: IApplicationState) => state.businessEntities.contracts);
  const [isClientsLoading, setClientsLoading] = useState(false);
  const [isContractsLoading, setContractsLoading] = useState(false);
  const [contract, setContract] = useState<IContract | null>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [doneTo, setDoneTo] = useState(new Date());
  const dispatch = useDispatch();

  const getContracts = useCallback(async (client: IClient): Promise<void> => {
    await dispatch(getContractsAsync(client.id));
    setContractsLoading(false);
    setContract(contracts.length ? contracts[0] : null);
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect((): void => {
    (async (): Promise<void> => {
      await dispatch(getClientsAsync());
      setClientsLoading(false);
    })();
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (clients.length) {
      getContracts(clients[0]);
    }
  }, [clients, getContracts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const id = await postTask({
        contractId: contract?.id as number,
        name,
        description,
        doneTo,
      });
      dispatch(addTaskAction({
        id,
        contract: contract as IContract,
        name,
        description,
        doneTo,
      }));
      toast.success('Задача успешно добавлена');
    } catch (err) {
      handleAxiosError(err, 'Не удалось добавить задачу');
    }
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  const handleClientChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const client = clients.find((client) => client.name === e.currentTarget.value);
    if (!client) {
      console.error('Could not find client for client with name:', e.currentTarget.value);
    } else {
      setContractsLoading(true);
      getContracts(client);
    }
  };

  const handleContractChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const contract = contracts.find((contract) => contract.name === e.currentTarget.value);
    if (!contract) {
      console.error('Could not find contract for contract with name:', e.currentTarget.value);
    } else {
      setContract(contract);
    }
  };

  const handleDoneToChange = (date: Date): void => {
    setDoneTo(date);
  };

  const handleDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setDescription(e.currentTarget.value);
  };

  return (
    <Form className="flex-grow-1" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicClient">
        <Form.Label>Связанный клиент</Form.Label>
        <Form.Control as="select" required onChange={handleClientChange}>
          {isClientsLoading ? <option>Загрузка...</option> :
            clients.map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicContract">
        <Form.Label>Связанный контракт</Form.Label>
        <Form.Control as="select" required onChange={handleContractChange}>
          {isContractsLoading ? <option>Загрузка...</option> :
            contracts.map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Имя задачи</Form.Label>
        <Form.Control placeholder="Введите имя" required onChange={handleNameChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Срок выполнения задачи</Form.Label>
        <DatePicker
          className="form-control"
          placeholderText="Выберите срок выполнения задачи"
          locale='ru'
          selected={doneTo}
          onChange={handleDoneToChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleDescriptionChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Добавить задачу
      </Button>
    </Form>
  );
};

export default AddTaskComponent;
