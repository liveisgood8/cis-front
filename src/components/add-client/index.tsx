import * as React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addClientAction } from '../../stores/business-entities/actions';
import { handleAxiosError } from '../../utils/axios';
import { postClient } from '../../services/business-entities.service';
import { store } from '../../stores/config-store';


interface IState {
  name: string;
  /**
   * @maxLength 128
   */
  email: string;
  address: string;
  comment?: string;
}

class AddClientComponent extends React.Component<{}, IState> {
  private async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    e.stopPropagation();
    try {
      const id = await postClient(this.state);
      store.dispatch(addClientAction({
        id,
        name: this.state.name,
        comment: this.state.comment,
      }));
      toast.success('Клиент успешно добавлен');
    } catch (err) {
      handleAxiosError(err, 'Не удалось добавить клиента');
    }
  }

  private handleNameChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  private handleEmailChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      email: e.currentTarget.value,
    });
  }

  private handleAddressChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      address: e.currentTarget.value,
    });
  }

  private handleCommentChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      comment: e.currentTarget.value,
    });
  }

  public render(): JSX.Element {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="flex-grow-1">
        <Form.Group controlId="formBasicName">
          <Form.Label>Имя клиента</Form.Label>
          <Form.Control placeholder="Введите имя" required onChange={this.handleNameChange.bind(this)} />
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
              onChange={this.handleEmailChange.bind(this)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Юридический адрес</Form.Label>
          <Form.Control placeholder="Введите юр. адрес" required onChange={this.handleAddressChange.bind(this)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Примечание</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            onChange={this.handleCommentChange.bind(this)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Добавить клиента
        </Button>
      </Form>
    );
  }
}

export default AddClientComponent;
