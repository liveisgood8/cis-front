import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import DatePicker from 'react-datepicker';
import { AxiosService } from '../../services/axios.service';
import { store } from '../..';
import { addToastAction } from '../../stores/toast/actions';
import { getContractsAsync, getClientsAsync, addTaskAction } from '../../stores/business-entities/actions';
import { IContract, IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';


interface IState {
  contract?: IContract;
  name?: string;
  description?: string;
  doneTo?: Date;

  isClientsLoading: boolean;
  isContractsLoading: boolean;
}

interface IReduxProps {
  clients: IClient[];
  contracts: IContract[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  clients: state.businessEntities.clients,
  contracts: state.businessEntities.contracts,
});

const mapDispatch = {
  getContractsAsync,
  getClientsAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

class AddTaskComponent extends React.Component<PropsFromRedux, IState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      isClientsLoading: true,
      isContractsLoading: true,
    };
  }

  private async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await AxiosService.post('/tasks', {
        contractId: this.state.contract?.id,
        name: this.state.name,
        description: this.state.description,
        doneTo: this.state.doneTo,
      });
      store.dispatch(addTaskAction({
        id: response.data,
        contract: this.state.contract as IContract,
        name: this.state.name as string,
        doneTo: this.state.doneTo as Date,
        description: this.state.description as string,
      }));
      store.dispatch(addToastAction({
        message: 'Задача успешна добавлена',
        type: 'info',
      }));
    } catch (err) {
      console.log(err.response?.data);
      store.dispatch(addToastAction({
        title: 'Не удалось добавить задачу',
        message: err.response?.data.message || err.message,
        type: 'danger',
      }));
    }
  }

  private async getContracts(client: IClient): Promise<void> {
    await this.props.getContractsAsync(client.id);
    this.setState({
      isContractsLoading: false,
      contract: this.props.contracts.length ? this.props.contracts[0] : undefined,
    });
  }

  private handleNameChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  private handleClientChange(e: React.FormEvent<HTMLInputElement>): void {
    const client = this.props.clients.find((client) => client.name === e.currentTarget.value);
    if (!client) {
      console.error('Could not find client for client with name:', e.currentTarget.value);
    } else {
      this.setState({
        isContractsLoading: true,
      });
      this.getContracts(client);
    }
  }

  private handleContractChange(e: React.FormEvent<HTMLInputElement>): void {
    const contract = this.props.contracts.find((contract) => contract.name === e.currentTarget.value);
    if (!contract) {
      console.error('Could not find contract for contract with name:', e.currentTarget.value);
    } else {
      this.setState({
        contract: contract,
      });
    }
  }

  private handleDoneToChange(date: Date): void {
    this.setState({
      doneTo: date,
    });
  }

  private handleDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  public componentDidMount(): void {
    this.props.getClientsAsync()
      .then(() => {
        this.setState({
          isClientsLoading: false,
        });
        if (this.props.clients.length) {
          this.getContracts(this.props.clients[0]);
        }
      });
  }

  public render(): JSX.Element {
    return (
      <Form className="flex-grow-1" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId="formBasicClient">
          <Form.Label>Связанный клиент</Form.Label>
          <Form.Control as="select" required onChange={this.handleClientChange.bind(this)}>
            {this.state.isClientsLoading ? <option>Загрузка...</option> :
              this.props.clients.map((e, i) => (
                <option key={i}>{e.name}</option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicContract">
          <Form.Label>Связанный контракт</Form.Label>
          <Form.Control as="select" required onChange={this.handleContractChange.bind(this)}>
            {this.state.isContractsLoading ? <option>Загрузка...</option> :
              this.props.contracts.map((e, i) => (
                <option key={i}>{e.name}</option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Имя задачи</Form.Label>
          <Form.Control placeholder="Введите имя" required onChange={this.handleNameChange.bind(this)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Срок выполнения задачи</Form.Label>
          <DatePicker
            className="form-control"
            placeholderText="Выберите срок выполнения задачи"
            locale='ru'
            selected={this.state.doneTo}
            onChange={this.handleDoneToChange.bind(this)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            onChange={this.handleDescriptionChange.bind(this)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Добавить задачу
        </Button>
      </Form>
    );
  }
}

export default connector(AddTaskComponent);
