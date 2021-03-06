import './styles.css';

import * as React from 'react';
import { Navbar, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { reverseVisibleAction } from '../../stores/sidebar/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { logoutThunk } from '../../stores/auth/actions';


const NavigationBar: React.SFC = () => {
  const user = useSelector((state: IApplicationState) => state.auth.authData?.user);
  const dispatch = useDispatch();

  const reverseSideBarVisible = (): void => {
    dispatch(reverseVisibleAction());
  };

  const onLogout = (): void => {
    dispatch(logoutThunk());
  };

  const onProfile = (): void => {
    dispatch(push('/profile'));
  };

  const userMenu = (
    <Tooltip id="overlay-example">
      <p id="profile-menu-element" onClick={onProfile}>Профиль</p>
      <p id="exit-menu-element" onClick={onLogout}>Выход</p>
    </Tooltip>
  );

  return (
    <Navbar className="main-header">
      <button id="menu-button" onClick={reverseSideBarVisible}>
        <FontAwesomeIcon icon={faBars} color="white" />
      </button>
      <Link id="home-link" to="/" className="product-label">
        <h4 className="m-0">QCRM</h4>
      </Link>
      <div className="profile-image-container ml-auto">
        <OverlayTrigger trigger="click" placement="bottom" overlay={userMenu} rootClose>
          <Image src={user?.imageUrl}
            roundedCircle
            height="50px"
            style={{ cursor: 'pointer' }}
          />
        </OverlayTrigger>
      </div>
    </Navbar >
  );
};

export default NavigationBar;
