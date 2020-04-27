import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IBaseBusinessEntity } from '../../stores/business-entities/types';
import { push, getLocation } from 'connected-react-router';
import { ViewTypes } from '.';
import { store } from '../../stores/config-store';

interface IState {
  mounted: boolean;
}

interface IProps<EntityType extends IBaseBusinessEntity> {
  listName: string;
  entities: EntityType[];
  entityClickHandler: (entity: EntityType) => void;
  addEntityComponent: JSX.Element | undefined;
  previousListName?: string;
  moveToPreviousList?: () => void;
}

export class BaseEntitiesList<EntityType extends IBaseBusinessEntity>
  extends React.Component<IProps<EntityType>, IState> {
  constructor(props: IProps<EntityType>) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  private handleMenuClick(): void {
    const location = getLocation(store.getState());
    store.dispatch(push(`${location.pathname}?viewType=${ViewTypes.Menu}`));
  }

  private createEntities(): JSX.Element[] {
    return this.props.entities.map((e, i) => {
      return (
        <li key={i}>
          <button id={`entity-${i}`} onClick={(): void => this.props.entityClickHandler(e)}>{e.name}</button>
        </li>
      );
    });
  }

  private createControlMenu(): JSX.Element {
    const moveToPreviousElement = this.props.moveToPreviousList && this.props.previousListName ?
      (
        <li>
          <button id="previous-level-button" onClick={this.props.moveToPreviousList}>
            <FontAwesomeIcon icon={faArrowLeft} className="icon" />
            {this.props.previousListName}
          </button>
        </li>
      ) : (
        undefined
      );
    return (
      <div>
        <p>{this.props.listName}</p>
        <li>
          <button id="menu-level-button" onClick={this.handleMenuClick.bind(this)}>
            <FontAwesomeIcon icon={faBars} className="icon" />
            В меню
          </button>
        </li>
        {moveToPreviousElement}
      </div >
    );
  }

  public componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 0);
  }

  public render(): JSX.Element {
    return (
      <div className={`side-bar-child ${this.state.mounted ? 'active' : ''}`}>
        <ul className="list-unstyled components">
          {this.createControlMenu()}
        </ul>
        <ul id="entities-list" className="list-unstyled components">
          {this.createEntities()}
          {this.props.addEntityComponent}
        </ul>
      </div>
    );
  }
}
