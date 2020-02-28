import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configStore, { history } from './stores/config-store';
import Routes from './routes';
import AlertPopup from './components/toast/toast';

export const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes browserHistory={history} />
    <AlertPopup />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
