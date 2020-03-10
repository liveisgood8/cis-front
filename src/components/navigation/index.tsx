import './styles.css';

import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { store } from '../..';
import { reverseVisibleAction } from '../../stores/sidebar/actions';

const NavigationBar: React.SFC<{}> = () => {
  const reverseSideBarVisible = (): void => {
    store.dispatch(reverseVisibleAction());
  };

  return (
    <Navbar className="main-header">
      <button className="menu-button" onClick={reverseSideBarVisible}>
        <FontAwesomeIcon icon={ faBars } color="white" />
      </button>
      <h4 className="product-label">QCRM</h4>
    </Navbar>
  );
};

export default NavigationBar;
