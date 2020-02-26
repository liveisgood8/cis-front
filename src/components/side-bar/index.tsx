import './sidebar.css';
import * as React from 'react';
import { IApplicationState } from '../../stores/config-reducers';
import { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';
import SideBarMenu from './menu';
import { ViewTypes } from '../../stores/side-bar/types';
import SideBarClients from './clients';

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
        return (<SideBarMenu />);
      case ViewTypes.Clients:
        return <SideBarClients />;
      case ViewTypes.Contracts:
        return <p>Contracts</p>;
      case ViewTypes.Tasks:
        return <p>Tasks</p>;
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
