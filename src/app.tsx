import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Routes from './routes';
import ToastContainer from './components/toast';
import { history } from './stores/config-store';
import { store } from '.';
import { fetchPermissions } from './stores/permissions/actions';
import { fetchPendingNumber } from './stores/business-requests/actions';
import { getAuthenticateData } from './services/auth.service';

export class App extends React.Component {
  componentDidMount(): void {
    if (getAuthenticateData()) {
      store.dispatch<any>(fetchPermissions());
      store.dispatch<any>(fetchPendingNumber());
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <Routes browserHistory={history} />
        <ToastContainer />
      </div>
    );
  }
}