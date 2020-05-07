import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterState, push } from 'connected-react-router';
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
  push,
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
    const urlSearchParams = new URLSearchParams(this.props.router.location.search);
    urlSearchParams.set('viewType', ViewTypes.Tasks.toString());
    urlSearchParams.set('clientId', this.clientId ? this.clientId.toString() : '0');
    urlSearchParams.set('contractId', contract.id.toString());
    this.props.push(`${this.props.router.location.pathname}?${urlSearchParams.toString()}`);
  }

  private handleBackClick(): void {
    const urlSearchParams = new URLSearchParams(this.props.router.location.search);
    urlSearchParams.set('viewType', ViewTypes.Clients.toString());
    urlSearchParams.delete('clientId');
    this.props.push(
      `${this.props.router.location.pathname}?${urlSearchParams.toString()}`,
    );
  }

  private addContractComponentCreator(): JSX.Element | undefined {
    if (!this.props.isHasAddPermission) {
      return;
    }
    return (
      <li>
        <Link id="add-contract-link" to={`/addContract${this.props.router.location.search}`}>
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
