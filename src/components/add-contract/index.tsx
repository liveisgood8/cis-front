import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

import React, { useState, useEffect } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsAsync, addContractAction } from '../../stores/business-entities/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { IClient } from '../../stores/business-entities/types';
import { handleAxiosError } from '../../utils/axios';
import { toast } from 'react-toastify';
import { postContract, postContractCopyFile } from '../../services/business-entities.service';

export const AddContractComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<IClient>();
  const [name, setName] = useState('');
  const [conclusionDate, setConclusionDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [scanFile, setScanFile] = useState<File | null>();
  const clients = useSelector((state: IApplicationState) => state.businessEntities.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    (async (): Promise<void> => {
      setIsLoading(true);
      await dispatch(getClientsAsync());
      setIsLoading(false);
    })();
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (clients.length) {
      setClient(clients[0]);
    }
  }, [clients]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const contentPath = await postContractCopyFile(scanFile as File);
      const id = await postContract({
        clientId: client?.id as number,
        name,
        conclusionDate,
        comment,
        copyPath: contentPath,
      });
      dispatch(addContractAction({
        id,
        name,
        conclusionDate,
        comment,
        client,
      }));
      toast.success('Договор успешно добавлен');
    } catch (err) {
      handleAxiosError(err, 'Не удалось добавить договор');
    }
  };

  const handleClientChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const client = clients.find((client) => client.name === e.currentTarget.value);
    if (!client) {
      console.error('Could not find client id for client with name:', e.currentTarget.value);
    } else {
      setClient(client);
    }
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  const handleConclusionDateChange = (date: Date): void => {
    setConclusionDate(date);
  };

  const handleCommentChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value);
  };

  const handleScanFileChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setScanFile(e.currentTarget.files?.item(0));
  };

  return (
    <Form className="flex-grow-1" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicAddress">
        <Form.Label>Связанный клиент</Form.Label>
        <Form.Control as="select" required onChange={handleClientChange}>
          {isLoading ? <option>Загрузка...</option> :
            clients.map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Имя договора</Form.Label>
        <Form.Control placeholder="Введите имя" required onChange={handleNameChange} />
      </Form.Group>


      <Form.Group>
        <Form.Label>Дата подписания договора</Form.Label>
        <DatePicker
          className="form-control"
          placeholderText="Выберите дату подписания договора"
          locale='ru'
          selected={conclusionDate}
          onChange={handleConclusionDateChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Примечание</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleCommentChange}
        />
      </Form.Group>

      <FormGroup className="custom-file mb-3">
        <Form.Control
          type="file"
          className="custom-file-input"
          style={{ cursor: 'pointer' }}
          onChange={handleScanFileChange}
          required
        />
        <Form.Label className="custom-file-label" data-browse="Выбрать файл">
          {scanFile ? scanFile.name : 'Выберите копию договора'}
        </Form.Label>
      </FormGroup>

      <Button id="add-contract-submit-button" variant="primary" type="submit">
        Добавить договор
      </Button>
    </Form>
  );
};

export default AddContractComponent;
