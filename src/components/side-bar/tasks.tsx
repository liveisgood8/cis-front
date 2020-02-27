import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { changeViewTypeAction } from '../../stores/side-bar/actions';
import { ITask } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { ViewTypes } from '../../stores/side-bar/types';
import { BaseEntitiesList } from './base-entities';

interface IReduxProps {
  viewType: ViewTypes;
  tasks: ITask[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  viewType: state.sideBar.viewType,
  tasks: state.businessEntities.tasks,
});

const mapDispatch = {
  changeViewTypeAction,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarTasks extends BaseEntitiesList<PropsFromRedux> {
  private handleTaskClick(task: ITask): void {
    console.log(task);
  }

  private handleBackClick(): void {
    this.props.changeViewTypeAction(ViewTypes.Contracts);
  }

  private handleMenuClick(): void {
    this.props.changeViewTypeAction(ViewTypes.Menu);
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
