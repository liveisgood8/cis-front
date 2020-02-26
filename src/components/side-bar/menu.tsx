import * as React from 'react';
import { getClientsAsync, getContractsAsync, getTasksAsync } from '../../stores/business-entities/actions';
import { changeViewTypeAction } from '../../stores/side-bar/actions';
import { connect, ConnectedProps } from 'react-redux';
import { ViewTypes } from '../../stores/side-bar/types';

interface IElement {
  name: string;
  url: string;
  viewType?: ViewTypes;
}

interface ISideBarMenuState {
  elements: IElement[];
}

const mapDispatch = {
  getClientsAsync,
  getContractsAsync,
  getTasksAsync,
  changeViewTypeAction,
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
        viewType: ViewTypes.Clients,
      },
      {
        name: 'Обращения',
        url: '#',
      },
    ];
  }

  private handleElementClick(element: IElement): void {
    switch (element.viewType) {
      case ViewTypes.Clients:
        this.props.getClientsAsync().then(() => {
          this.props.changeViewTypeAction(ViewTypes.Clients);
        });
        break;
    }
  }

  render(): JSX.Element {
    return (
      <ul className="list-unstyled components">
        <p>Основное меню</p>
        {this.state.elements.map((e, i) => {
          return (
            <li key={i} className={undefined /* 'active' */}>
              <a onClick={this.handleElementClick.bind(this, e)}>{e.name}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connector(SideBarMenu);
