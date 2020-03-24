import './styles.css';

import * as React from 'react';
import { Navbar, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { reverseVisibleAction } from '../../stores/sidebar/actions';
import { logout, getAuthenticateData } from '../../services/auth.service';


const NavigationBar: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const reverseSideBarVisible = (): void => {
    dispatch(reverseVisibleAction());
  };

  const onLogout = (): void => {
    logout();
    dispatch(push('/login'));
  };

  const onProfile = (): void => {
    dispatch(push('/profile'));
  };

  const userMenu = (
    <Tooltip id="overlay-example">
      <p onClick={onProfile}>Профиль</p>
      <p onClick={onLogout}>Выход</p>
    </Tooltip>
  );

  return (
    <Navbar className="main-header">
      <button className="menu-button" onClick={reverseSideBarVisible}>
        <FontAwesomeIcon icon={faBars} color="white" />
      </button>
      <h4 className="product-label flex-grow-1">QCRM</h4>
      <div className="profile-image-container">
        <OverlayTrigger trigger="click" placement="bottom" overlay={userMenu} rootClose>
          <Image src={getAuthenticateData()?.user.imageUrl}
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
