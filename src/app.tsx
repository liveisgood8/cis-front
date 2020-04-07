import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import * as React from 'react';
import { toast } from 'react-toastify';
import Routes from './routes';
import { store, history } from './stores/config-store';
import { fetchPermissions } from './stores/permissions/actions';
import { fetchPendingNumber } from './stores/business-requests/actions';
import { getAuthenticateData } from './services/auth.service';

toast.configure();

class App extends React.Component {
  componentDidMount(): void {
    if (getAuthenticateData()) {
      store.dispatch<any>(fetchPermissions());
      store.dispatch<any>(fetchPendingNumber());
    }
  }

  render(): JSX.Element {
    return (
      <Routes browserHistory={history} />
    );
  }
}

export default App;
