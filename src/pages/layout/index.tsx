import './layout.css';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import SideBar from '../../components/side-bar';

const Layout: React.SFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <div className="wrapper">
      <SideBar />

      <div id="content">
        {props.children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
