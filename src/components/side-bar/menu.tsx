import * as React from 'react';
import { Location } from 'history';
import { getClientsAsync, getContractsAsync, getTasksAsync } from '../../stores/business-entities/actions';
import { connect, ConnectedProps } from 'react-redux';
import { IApplicationState } from '../../stores/config-reducers';
import { ViewTypes } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faEnvelopeOpenText, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';

interface IElement {
  name: string;
  url: string;
}

interface ISideBarMenuState {
  elements: IElement[];
}

interface IReduxProps {
  routerLocation: Location;
  pendingBusinessRequestsNumber: number;
  isHasRegisterRequestPermission: boolean;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  routerLocation: state.router.location,
  pendingBusinessRequestsNumber: state.businessRequests.pendingNumber,
  isHasRegisterRequestPermission: isHasPermissionSelectorFactory(UserPermissions.REGISTER_REQUEST)(state),
});

const mapDispatch = {
  getClientsAsync,
  getContractsAsync,
  getTasksAsync,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarMenu extends React.Component<PropsFromRedux, ISideBarMenuState> {
  render(): JSX.Element {
    return (
      <div>
        <ul className="list-unstyled components">
          <p>Основное меню</p>
          <li>
            <Link to={`${this.props.routerLocation.pathname}?viewType=${ViewTypes.Clients}`}>
              <FontAwesomeIcon icon={faUserFriends} className="icon" />
              Клиенты
            </Link>
          </li>
          <li>
            <Link to={`/requests${this.props.routerLocation.search}`}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="icon" />
              Обращения
              <Badge variant="light" className="ml-2">{this.props.pendingBusinessRequestsNumber}</Badge>
            </Link>
          </li>
        </ul>
        {this.props.isHasRegisterRequestPermission ?
          <ul className="list-unstyled components">
            <li>
              <Link to={`/addRequest${this.props.routerLocation.search}`}>
                <FontAwesomeIcon icon={faPaperPlane} className="icon" />
                Регистрация обращения
              </Link>
            </li>
          </ul> :
          undefined
        }

      </div>
    );
  }
}

export default connector(SideBarMenu);
