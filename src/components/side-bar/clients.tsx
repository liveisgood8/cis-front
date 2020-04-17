import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import { getClientsAsync } from '../../stores/business-entities/actions';
import { IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';
import { ViewTypes } from './';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';
import { Link } from 'react-router-dom';

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
  push,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarClients extends React.Component<PropsFromRedux> {
  private handleClientClick(client: IClient): void {
    this.props.push(
      `${this.props.routerPath}?viewType=${ViewTypes.Contracts}&clientId=${client.id}`);
  }

  private addClientComponentCreator(): JSX.Element | undefined {
    if (!this.props.isHasAddPermission) {
      return;
    }
    return (
      <li>
        <Link to={`/addClient?viewType=${ViewTypes.Clients}`}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Добавить клиента
        </Link>
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
