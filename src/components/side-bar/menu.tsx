import * as React from 'react';
import { Location } from 'history';
import { connect, ConnectedProps } from 'react-redux';
import { IApplicationState } from '../../stores/config-reducers';
import { ViewTypes } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faEnvelopeOpenText, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';
import { SearchComponent } from '../search-component';
import { push } from 'connected-react-router';

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
  push,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarMenu extends React.Component<PropsFromRedux> {
  render(): JSX.Element {
    return (
      <div>
        <ul className="list-unstyled components">
          <li>
            <SearchComponent
              onSearch={(query): void => {
                console.log('test');
                this.props.push(`/search?query=${query}`);
              }}
            />
          </li>
          <p className="pb-0">Основное меню</p>
          <li>
            <Link id="clients-link" to={(location) => {
              const urlSearchParams = new URLSearchParams(location.search);
              urlSearchParams.set('viewType', ViewTypes.Clients.toString());
              return {
                ...location,
                search: '?' + urlSearchParams.toString(),
              };
            }}>
              <FontAwesomeIcon icon={faUserFriends} className="icon" />
              Клиенты
            </Link>
          </li>
          <li>
            <Link id="requests-link" to={`/requests${this.props.routerLocation.search}`}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="icon" />
              Обращения
              <Badge variant="light" className="ml-2">{this.props.pendingBusinessRequestsNumber}</Badge>
            </Link>
          </li>
        </ul>
        {this.props.isHasRegisterRequestPermission ?
          <ul className="list-unstyled components">
            <li>
              <Link id="add-request-link" to={`/addRequest${this.props.routerLocation.search}`}>
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
