import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Routes from './routes';
import AlertPopup from './components/toast/toast';
import { history } from './stores/config-store';
import { store } from '.';
import { fetchPermissions } from './stores/permissions/actions';

export class App extends React.Component {
  componentDidMount(): void {
    store.dispatch<any>(fetchPermissions());
  }

  render(): JSX.Element {
    return (
      <div>
        <Routes browserHistory={history} />
        <AlertPopup />
      </div>
    );
  }
}