import * as React from 'react';
import { getClientsAsync, getContractsAsync, getTasksAsync } from '../../stores/business-entities/actions';
import { connect, ConnectedProps } from 'react-redux';
import { store } from '../..';
import { push } from 'connected-react-router';

interface IElement {
  name: string;
  url: string;
}

interface ISideBarMenuState {
  elements: IElement[];
}

const mapDispatch = {
  getClientsAsync,
  getContractsAsync,
  getTasksAsync,
};

const connector = connect(
  null,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export class SideBarMenu extends React.Component<PropsFromRedux, ISideBarMenuState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      elements: this.createElements(),
    };
  }

  private createElements(): IElement[] {
    return [
      {
        name: 'Клиенты',
        url: '#',
      },
      {
        name: 'Обращения',
        url: '#',
      },
    ];
  }

  private handleClientsClick(): void {
    store.dispatch(push('/clients'));
  }

  private handleRequestsClick(): void {
    console.log('request click');
  }

  render(): JSX.Element {
    return (
      <ul className="list-unstyled components">
        <p>Основное меню</p>
        <li className={undefined /* 'active' */}>
          <button onClick={this.handleClientsClick.bind(this)}>Клиенты</button>
        </li>
        <li className={undefined /* 'active' */}>
          <button onClick={this.handleRequestsClick.bind(this)}>Обращения</button>
        </li>
      </ul>
    );
  }
}

export default connector(SideBarMenu);
