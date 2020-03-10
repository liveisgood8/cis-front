import './layout.css';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import SideBar from '../../components/side-bar';
import NavigationBar from '../../components/navigation';

const Layout: React.SFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <div>
      <NavigationBar />
      <SideBar />
      <div className="wrapper">
        <div style={{ width: '100%' }}>
          <div id="content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
