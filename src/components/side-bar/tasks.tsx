import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterState, push } from 'connected-react-router';
import { ITask } from '../../stores/business-entities/types';
import { getTasksAsync } from '../../stores/business-entities/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';
import { store } from '../..';
import { ViewTypes } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';
import { Link } from 'react-router-dom';

interface IReduxProps {
  tasks: ITask[];
  router: RouterState;
  isHasAddPermission: boolean;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  tasks: state.businessEntities.tasks,
  router: state.router,
  isHasAddPermission: isHasPermissionSelectorFactory(UserPermissions.ADD_TASKS)(state),
});

const mapDispatch = {
  getTasksAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarTasks extends React.Component<PropsFromRedux> {
  private clientId: number | null = null;
  private contractId: number | null = null;

  constructor(props: PropsFromRedux) {
    super(props);

    const urlParams = new URLSearchParams(this.props.router.location.search);
    const clientIdString = urlParams.get('clientId');
    const contractIdString = urlParams.get('contractId');
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

  private addTaskComponentCreator(): JSX.Element | undefined {
    if (!this.props.isHasAddPermission) {
      return;
    }
    return (
      <li>
        <Link to={`/addTask?viewType=${ViewTypes.Tasks}&clientId=${this.clientId}&contractId=${this.contractId}`}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Добавить задачу
        </Link>
      </li>
    );
  }

  componentDidMount(): void {
    if (this.contractId) {
      this.props.getTasksAsync(this.contractId);
    }
  }

  render(): JSX.Element {
    return (
      <BaseEntitiesList<ITask>
        entities={this.props.tasks}
        listName="Задачи"
        entityClickHandler={this.handleTaskClick.bind(this)}
        addEntityComponent={this.addTaskComponentCreator()}
        previousListName="Договора"
        moveToPreviousList={this.handleBackClick.bind(this)}
      />
    );
  }
}

export default connector(SideBarTasks);
