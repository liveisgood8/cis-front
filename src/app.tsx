import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru'; // the locale you want
import Routes from './routes';
import { history } from './stores/config-store';
import { fetchPermissions } from './stores/permissions/actions';
import { fetchPendingNumber } from './stores/business-requests/actions';
import { getAuthenticateData } from './services/auth.service';
import { useDispatch } from 'react-redux';

registerLocale('ru', ru);
toast.configure();

const App: React.SFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAuthenticateData()) {
      dispatch(fetchPermissions());
      dispatch(fetchPendingNumber());
    }
  }, [dispatch]);

  return (
    <Routes browserHistory={history} />
  );
};

export default App;
