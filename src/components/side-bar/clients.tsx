import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import { getClientsAsync } from '../../stores/business-entities/actions';
import { IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';
import { store } from '../..';
import { ViewTypes } from './';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';

interface IReduxProps {
  clients: IClient[];
  routerPath: string;
  isHasAddPermission: boolean;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  clients: state.businessEntities.clients,
  routerPath: state.router.location.pathname,
  isHasAddPermission: isHasPermissionSelectorFactory(UserPermissions.ADD_CLIENTS)(state),
});

const mapDispatch = {
  getClientsAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarClients extends React.Component<PropsFromRedux> {
  private handleClientClick(client: IClient): void {
    store.dispatch(push(
      `${this.props.routerPath}?viewType=${ViewTypes.Contracts}&clientId=${client.id}`));
  }

  private addClientComponentCreator(): JSX.Element | undefined {
    if (!this.props.isHasAddPermission) {
      return;
    }
    return (
      <li>
        <a href={`/addClient?viewType=${ViewTypes.Clients}`}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Добавить клиента
        </a>
      </li>
    );
  }

  componentDidMount(): void {
    this.props.getClientsAsync();
  }

  render(): JSX.Element {
    return (
      <BaseEntitiesList<IClient>
        entities={this.props.clients}
        listName="Клиенты"
        entityClickHandler={this.handleClientClick.bind(this)}
        addEntityComponent={this.addClientComponentCreator()}
      />
    );
  }
}

export default connector(SideBarClients);
