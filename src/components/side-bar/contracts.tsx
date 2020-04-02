import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterState, push } from 'connected-react-router';
import { store } from '../../index';
import { getContractsAsync } from '../../stores/business-entities/actions';
import { IContract } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { BaseEntitiesList } from './base-entities';
import { ViewTypes } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';
import { Link } from 'react-router-dom';

interface IReduxProps {
  contracts: IContract[];
  router: RouterState;
  isHasAddPermission: boolean;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => {
  return {
    contracts: state.businessEntities.contracts,
    router: state.router,
    isHasAddPermission: isHasPermissionSelectorFactory(UserPermissions.ADD_CONTRACTS)(state),
  };
};

const mapDispatch = {
  getContractsAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarContracts extends React.Component<PropsFromRedux> {
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
    store.dispatch(push(
      `${this.props.router.location.pathname}?viewType=${ViewTypes.Tasks}` +
      `&clientId=${this.clientId}&contractId=${contract.id}`));
  }

  private handleBackClick(): void {
    store.dispatch(push(
      `${this.props.router.location.pathname}?viewType=${ViewTypes.Clients}`,
    ));
  }

  private addContractComponentCreator(): JSX.Element | undefined {
    if (!this.props.isHasAddPermission) {
      return;
    }
    return (
      <li>
        <Link to={`/addContract?viewType=${ViewTypes.Contracts}&clientId=${this.clientId}`}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Добавить договор
        </Link>
      </li>
    );
  }

  componentDidMount(): void {
    if (this.clientId) {
      this.props.getContractsAsync(this.clientId);
    }
  }

  render(): JSX.Element {
    return (
      <BaseEntitiesList<IContract>
        entities={this.props.contracts}
        listName="Договора"
        entityClickHandler={this.handleContractClick.bind(this)}
        addEntityComponent={this.addContractComponentCreator()}
        previousListName="Клиенты"
        moveToPreviousList={this.handleBackClick.bind(this)}
      />
    );
  }
}

export default connector(SideBarContracts);
