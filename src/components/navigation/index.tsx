import './styles.css';

import * as React from 'react';
import { Navbar, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { reverseVisibleAction } from '../../stores/sidebar/actions';
import { logout } from '../../services/auth.service';


const NavigationBar: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const reverseSideBarVisible = (): void => {
    dispatch(reverseVisibleAction());
  };

  const onLogout = (): void => {
    logout();
    dispatch(push('/login'));
  };

  const userMenu = (
    <Tooltip id="overlay-example">
      <span onClick={onLogout}>Выход</span>
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
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
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
