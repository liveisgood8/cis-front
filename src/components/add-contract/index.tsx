import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import { connect, ConnectedProps } from 'react-redux';
import ru from 'date-fns/locale/ru';
import { AxiosService } from '../../services/axios.service';
import { store } from '../..';
import { addToastAction } from '../../stores/toast/actions';
import { getClientsAsync, addContractAction } from '../../stores/business-entities/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { IClient } from '../../stores/business-entities/types';

interface IReduxProps {
  clients: IClient[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  clients: state.businessEntities.clients,
});

const mapDispatch = {
  getClientsAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

interface IState {
  /**
   * @isInt clientId must be an integer
   */
  client?: IClient;
  name?: string;
  conclusionDate?: Date;
  comment?: string;

  isLoading: boolean;
}


export class AddContractComponent extends React.Component<PropsFromRedux, IState> {
  constructor(props: PropsFromRedux) {
    super(props);
    registerLocale('ru', ru);
    this.state = {
      isLoading: true,
    };
  }

  public componentDidMount(): void {
    this.props.getClientsAsync()
      .then(() => {
        this.setState({
          client: this.props.clients.length ? this.props.clients[0] : undefined,
          isLoading: false,
        });
      });
  }

  private async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await AxiosService.post('/contracts', {
        clientId: this.state.client?.id,
        name: this.state.name,
        conclusionDate: this.state.conclusionDate,
        comment: this.state.comment,
      });
      store.dispatch(addContractAction({
        id: result.data,
        name: this.state.name as string,
        conclusionDate: this.state.conclusionDate as Date,
        comment: this.state.comment,
        client: this.state.client as IClient,
      }));
      store.dispatch(addToastAction({
        message: 'Договор успешно добавлен',
        type: 'info',
      }));
    } catch (err) {
      store.dispatch(addToastAction({
        title: 'Не удалось добавить договор',
        message: err.response?.data.message || err.message,
        type: 'danger',
      }));
    }
  }

  private handleClientChange(e: React.FormEvent<HTMLInputElement>): void {
    const client = this.props.clients.find((client) => client.name === e.currentTarget.value);
    if (!client) {
      console.error('Could not find client id for client with name:', e.currentTarget.value);
    } else {
      this.setState({
        client: client,
      });
    }
  }

  private handleNameChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  private handleConclusionDateChange(date: Date): void {
    this.setState({
      conclusionDate: date,
    });
  }

  private handleCommentChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      comment: e.currentTarget.value,
    });
  }

  public render(): JSX.Element {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Связанный клиент</Form.Label>
          <Form.Control as="select" required onChange={this.handleClientChange.bind(this)}>
            {this.state.isLoading ? <option>Загрузка...</option> :
              this.props.clients.map((e, i) => (
                <option key={i}>{e.name}</option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Имя договора</Form.Label>
          <Form.Control placeholder="Введите имя" required onChange={this.handleNameChange.bind(this)} />
        </Form.Group>


        <Form.Group>
          <Form.Label>Дата подписания договора</Form.Label>
          <DatePicker
            className="form-control"
            placeholderText="Выберите дату подписания договора"
            locale='ru'
            selected={this.state.conclusionDate}
            onChange={this.handleConclusionDateChange.bind(this)}
            required
          />
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
          Добавить договор
        </Button>
      </Form>
    );
  }
}

export default connector(AddContractComponent);
