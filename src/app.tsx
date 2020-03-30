import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import * as React from 'react';
import { toast } from 'react-toastify';
import Routes from './routes';
import { history } from './stores/config-store';
import { store } from '.';
import { fetchPermissions } from './stores/permissions/actions';
import { fetchPendingNumber } from './stores/business-requests/actions';
import { getAuthenticateData } from './services/auth.service';

toast.configure();

export class App extends React.Component {
  componentDidMount(): void {
    if (getAuthenticateData()) {
      store.dispatch<any>(fetchPermissions());
      store.dispatch<any>(fetchPendingNumber());
    }
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Routes browserHistory={history} />
      </React.Fragment>
    );
  }
}