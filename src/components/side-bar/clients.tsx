import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { changeViewTypeAction } from '../../stores/side-bar/actions';
import { getContractsAsync } from '../../stores/business-entities/actions';
import { IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { ViewTypes } from '../../stores/side-bar/types';
import { BaseEntitiesList } from './base-entities';

interface IReduxProps {
  viewType: ViewTypes;
  clients: IClient[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  viewType: state.sideBar.viewType,
  clients: state.businessEntities.clients,
});

const mapDispatch = {
  getContractsAsync,
  changeViewTypeAction,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarClients extends BaseEntitiesList<PropsFromRedux> {
  private handleClientClick(client: IClient): void {
    this.props.getContractsAsync()
      .then(() => {
        this.props.changeViewTypeAction(ViewTypes.Contracts);
      });
  }

  private handleMenuClick(): void {
    this.props.changeViewTypeAction(ViewTypes.Menu);
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

export default connector(SideBarClients);
