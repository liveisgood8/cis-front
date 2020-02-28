import './sidebar.css';
import { ConnectedProps, connect } from 'react-redux';
import * as React from 'react';
import { RouterState } from 'connected-react-router';
import { IApplicationState } from '../../stores/config-reducers';
import SideBarMenu from './menu';
import SideBarClients from './clients';
import SideBarContracts from './contracts';
import SideBarTasks from './tasks';

interface IReduxProps {
  router: RouterState;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  router: state.router,
});

const connector = connect(
  mapStateToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBar extends React.Component<PropsFromRedux, {}> {
  private getCurrentChild(): JSX.Element {
    switch (this.props.router.location.pathname) {
      case '/':
        return <SideBarMenu />;
      case '/clients':
        return <SideBarClients />;
      case '/contracts':
        return <SideBarContracts />;
      case '/tasks':
        return <SideBarTasks />;
      default:
        return <div></div>;
    }
  }

  render(): JSX.Element {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Система QCRM</h3>
        </div>

        {this.getCurrentChild()}
      </nav>
    );
  }
}

export default connector(SideBar);
