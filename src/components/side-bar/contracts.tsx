import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { changeViewTypeAction } from '../../stores/side-bar/actions';
import { getTasksAsync } from '../../stores/business-entities/actions';
import { IContract } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { ViewTypes } from '../../stores/side-bar/types';
import { BaseEntitiesList } from './base-entities';

interface IReduxProps {
  viewType: ViewTypes;
  contracts: IContract[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  viewType: state.sideBar.viewType,
  contracts: state.businessEntities.contracts,
});

const mapDispatch = {
  getTasksAsync,
  changeViewTypeAction,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarContracts extends BaseEntitiesList<PropsFromRedux> {
  private handleContractClick(contract: IContract): void {
    this.props.getTasksAsync()
      .then(() => {
        this.props.changeViewTypeAction(ViewTypes.Tasks);
      });
  }

  private handleBackClick(): void {
    this.props.changeViewTypeAction(ViewTypes.Clients);
  }

  private handleMenuClick(): void {
    this.props.changeViewTypeAction(ViewTypes.Menu);
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
