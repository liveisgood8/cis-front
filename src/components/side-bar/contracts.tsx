import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterState, push } from 'connected-react-router';
import { store } from '../../index'
import { getTasksAsync, getContractsAsync } from '../../stores/business-entities/actions';
import { IContract } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';

interface IReduxProps {
  contracts: IContract[];
  router: RouterState;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => {
  return {
    contracts: state.businessEntities.contracts,
    router: state.router,
  };
};

const mapDispatch = {
  getTasksAsync,
  getContractsAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarContracts extends BaseEntitiesList<PropsFromRedux> {
  private clientId: number | null = null;

  constructor(props: PropsFromRedux) {
    super(props);

    const clientIdString = new URLSearchParams(this.props.router.location.search)
      .get('clientId');
    if (clientIdString) {
      this.clientId = parseInt(clientIdString);
    }
  }

  private handleContractClick(contract: IContract): void {
    store.dispatch(push(`/tasks?clientId=${this.clientId}&contractId=${contract.id}`));
  }

  private handleBackClick(): void {
    store.dispatch(push('/clients'));
  }

  private handleMenuClick(): void {
    store.dispatch(push('/'));
  }

  private createEntities(): JSX.Element[] {
    return this.props.contracts.map((e, i) => {
      return (
        <li key={i}>
          <button onClick={this.handleContractClick.bind(this, e)}>{e.name}</button>
        </li>
      );
    });
  }

  private createControlMenu(): JSX.Element {
    return (
      <div>
        <p>Договора</p>
        <li>
          <button onClick={this.handleMenuClick.bind(this)}>В меню</button>
        </li>
        <li>
          <button onClick={this.handleBackClick.bind(this)}>Клиенты</button>
        </li>
      </div>
    );
  }

  componentDidMount(): void {
    if (this.clientId) {
      this.props.getContractsAsync(this.clientId);
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

export default connector(SideBarContracts);
