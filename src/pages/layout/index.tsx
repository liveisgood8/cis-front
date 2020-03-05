import './layout.css';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import SideBar from '../../components/side-bar';
import NavigationBar from '../../components/navigation';

const Layout: React.SFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <div className="wrapper">
      <SideBar />
      <div style={{ width: '100%' }}>
        <NavigationBar />
        <div id="content">
          {props.children}
        </div>
      </div>

    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
