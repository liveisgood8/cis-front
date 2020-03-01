import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterState, push } from 'connected-react-router';
import { ITask } from '../../stores/business-entities/types';
import { getTasksAsync } from '../../stores/business-entities/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';
import { store } from '../..';
import { ViewTypes } from '.';

interface IReduxProps {
  tasks: ITask[];
  router: RouterState;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  tasks: state.businessEntities.tasks,
  router: state.router,
});

const mapDispatch = {
  getTasksAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarTasks extends BaseEntitiesList<PropsFromRedux> {
  private clientId: number | null = null;
  private contractId: number | null = null;

  constructor(props: PropsFromRedux) {
    super(props);

    const clientIdString = new URLSearchParams(this.props.router.location.search)
      .get('clientId');
    const contractIdString = new URLSearchParams(this.props.router.location.search)
      .get('contractId');
    if (clientIdString) {
      this.clientId = parseInt(clientIdString);
    }
    if (contractIdString) {
      this.contractId = parseInt(contractIdString);
    }
  }

  private handleTaskClick(task: ITask): void {
    console.log(task);
  }

  private handleBackClick(): void {
    store.dispatch(push(
      `${this.props.router.location.pathname}?viewType=${ViewTypes.Contracts}&clientId=${this.clientId}`));
  }

  private handleMenuClick(): void {
    store.dispatch(push('/'));
  }

  private createEntities(): JSX.Element[] {
    return this.props.tasks.map((e, i) => {
      return (
        <li key={i}>
          <button onClick={this.handleTaskClick.bind(this, e)}>{e.name}</button>
        </li>
      );
    });
  }

  private createControlMenu(): JSX.Element {
    return (
      <div>
        <p>Задачи</p>
        <li>
          <button onClick={this.handleMenuClick.bind(this)}>В меню</button>
        </li>
        <li>
          <button onClick={this.handleBackClick.bind(this)}>Договора</button>
        </li>
      </div>
    );
  }

  componentDidMount(): void {
    if (this.contractId) {
      this.props.getTasksAsync(this.contractId);
    }
    super.componentDidMount();
  }

  render(): JSX.Element {
    return (
      <div className={`side-bar-child ${this.state.mounted ? 'active' : ''}`}>
        <ul className="list-unstyled components">
          {this.createControlMenu()}
        </ul>
        <ul className="list-unstyled components">
          {this.createEntities()}
        </ul>
      </div>
    );
  }
}

export default connector(SideBarTasks);
