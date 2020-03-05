import './sidebar.css';
import { ConnectedProps, connect } from 'react-redux';
import * as React from 'react';
import { RouterState } from 'connected-react-router';
import { IApplicationState } from '../../stores/config-reducers';
import SideBarMenu from './menu';
import SideBarClients from './clients';
import SideBarContracts from './contracts';
import SideBarTasks from './tasks';

export enum ViewTypes {
  Menu,
  Clients,
  Contracts,
  Tasks,
}

interface IReduxProps {
  router: RouterState;
  isVisible: boolean;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  router: state.router,
  isVisible: state.sideBar.isVisible,
});

const connector = connect(
  mapStateToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBar extends React.Component<PropsFromRedux, {}> {
  private getViewTypeFromRouter(): ViewTypes {
    const viewTypeString = new URLSearchParams(this.props.router.location.search)
      .get('viewType');
    if (viewTypeString) {
      return parseInt(viewTypeString);
    }
    return ViewTypes.Menu;
  }

  private getCurrentChild(): JSX.Element {
    switch (this.getViewTypeFromRouter()) {
      case ViewTypes.Menu:
        return <SideBarMenu />;
      case ViewTypes.Clients:
        return <SideBarClients />;
      case ViewTypes.Contracts:
        return <SideBarContracts />;
      case ViewTypes.Tasks:
        return <SideBarTasks />;
    }
  }

  render(): JSX.Element {
    return (
      <nav id="sidebar" className={this.props.isVisible ? 'active' : ''}>
        <div className="sidebar-header">
          <h4>Система QCRM</h4>
        </div>

        {this.getCurrentChild()}
      </nav>
    );
  }
}

export default connector(SideBar);
