import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addClientAction } from '../../stores/business-entities/actions';
import { handleAxiosError } from '../../utils/axios';
import { postClient } from '../../services/business-entities.service';
import { useDispatch } from 'react-redux';


const AddClientComponent: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const id = await postClient({
        name,
        address,
        email,
        comment,
      });
      dispatch(addClientAction({
        id,
        name,
        comment,
      }));
      toast.success('Клиент успешно добавлен');
    } catch (err) {
      handleAxiosError(err, 'Не удалось добавить клиента');
    }
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleAddressChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setAddress(e.currentTarget.value);
  };

  const handleCommentChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value);
  };

  return (
    <Form onSubmit={handleSubmit} className="flex-grow-1">
      <Form.Group controlId="formBasicName">
        <Form.Label>Имя клиента</Form.Label>
        <Form.Control placeholder="Введите имя" required onChange={handleNameChange} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Электронная почта</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="email"
            placeholder="Введите эл. адрес"
            aria-describedby="inputGroupPrepend"
            required
            onChange={handleEmailChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formBasicAddress">
        <Form.Label>Юридический адрес</Form.Label>
        <Form.Control placeholder="Введите юр. адрес" required onChange={handleAddressChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Примечание</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleCommentChange}
        />
      </Form.Group>

      <Button id="add-client-submit-button" variant="primary" type="submit">
        Добавить клиента
      </Button>
    </Form>
  );
};

export default AddClientComponent;
