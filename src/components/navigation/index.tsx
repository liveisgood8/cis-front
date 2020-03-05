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
    </Navbar>
  );
};

export default NavigationBar;
