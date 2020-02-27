import './sidebar.css';
import { ConnectedProps, connect } from 'react-redux';
import * as React from 'react';
import { IApplicationState } from '../../stores/config-reducers';
import SideBarMenu from './menu';
import { ViewTypes } from '../../stores/side-bar/types';
import SideBarClients from './clients';
import SideBarContracts from './contracts';
import SideBarTasks from './tasks';

interface IReduxProps {
  viewType: ViewTypes;
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  viewType: state.sideBar.viewType,
});

const connector = connect(
  mapStateToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBar extends React.Component<PropsFromRedux, {}> {
  private getCurrentChild(): JSX.Element {
    switch (this.props.viewType) {
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
