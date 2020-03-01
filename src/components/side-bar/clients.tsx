import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {  push } from 'connected-react-router';
import { getContractsAsync, getClientsAsync } from '../../stores/business-entities/actions';
import { IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';
import { store } from '../..';
import { ViewTypes } from './';

interface IReduxProps {
  clients: IClient[];
  routerPath: string;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  clients: state.businessEntities.clients,
  routerPath: state.router.location.pathname,
});

const mapDispatch = {
  getClientsAsync,
  getContractsAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarClients extends BaseEntitiesList<PropsFromRedux> {
  private handleClientClick(client: IClient): void {
    store.dispatch(push(
      `${this.props.routerPath}?viewType=${ViewTypes.Contracts}&clientId=${client.id}`));
  }

  private handleMenuClick(): void {
    store.dispatch(push('/'));
  }

  private createEntities(): JSX.Element[] {
    return this.props.clients.map((e, i) => {
      return (
        <li key={i}>
          <button onClick={this.handleClientClick.bind(this, e)}>{e.name}</button>
        </li>
      );
    });
  }

  private createControlMenu(): JSX.Element {
    return (
      <div>
        <p>Клиенты</p>
        <li>
          <button onClick={this.handleMenuClick.bind(this)}>В меню</button>
        </li>
      </div >
    );
  }

  componentDidMount(): void {
    this.props.getClientsAsync();
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
          <li>
            <a href={`/addClient?viewType=${ViewTypes.Clients}`}>Добавить клиента</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default connector(SideBarClients);
