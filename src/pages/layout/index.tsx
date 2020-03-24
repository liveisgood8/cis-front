import './layout.css';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import SideBar from '../../components/side-bar';
import NavigationBar from '../../components/navigation';

const Layout: React.SFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="wrapper">
        <SideBar />
        <main className="flex-grow-1 m-3 d-flex">
          {props.children}
        </main>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
