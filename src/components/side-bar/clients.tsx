import * as React from 'react';
import { changeViewTypeAction } from '../../stores/side-bar/actions';
import { IClient } from '../../stores/business-entities/types';
import { IApplicationState } from '../../stores/config-reducers';
import { connect, ConnectedProps } from 'react-redux';
import { ViewTypes } from '../../stores/side-bar/types';

interface IReduxProps {
  clients: IClient[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  clients: state.businessEntities.clients,
});

const mapDispatch = {
  changeViewTypeAction,
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarClients extends React.Component<PropsFromRedux, {}> {
  private handleClientClick(client: IClient): void {
    console.log(client);
  }

  private handleBackClick(): void {
    this.props.changeViewTypeAction(ViewTypes.Menu);
  }

  render(): JSX.Element {
    return (
      <ul className="list-unstyled components">
        <li>
          <a onClick={this.handleBackClick.bind(this)}>В меню</a>
        </li>
        <p>Клиенты</p>
        {this.props.clients.map((e, i) => {
          return (
            <li key={i}>
              <a onClick={this.handleClientClick.bind(this, e)}>{e.name}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connector(SideBarClients);
