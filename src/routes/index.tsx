import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import NotFoundedPage from '../pages/not-founded-page';
import { PrivateLayoutRoute } from './private-layout-route';
import AddClientComponent from '../components/add-client';
import AddContractComponent from '../components/add-contract';
import AddTaskComponent from '../components/add-task';
import RequestListComponent from '../components/request-list';
import RegisterPage from '../pages/register-page';

interface IRoutesProps {
  browserHistory: History;
}

const Routes: React.SFC<IRoutesProps> = (props) => (
  <ConnectedRouter history={props.browserHistory}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/registration" component={RegisterPage} />
      <PrivateLayoutRoute exact path="/" component={HomePage} />
      <PrivateLayoutRoute exact path="/addClient" component={AddClientComponent} />
      <PrivateLayoutRoute exact path="/addContract" component={AddContractComponent} />
      <PrivateLayoutRoute exact path="/addTask" component={AddTaskComponent} />
      <PrivateLayoutRoute exact path="/requests" component={RequestListComponent} />
      <Route path='*' exact component={NotFoundedPage} />
    </Switch>
  </ConnectedRouter>
);

Routes.propTypes = {
  browserHistory: PropTypes.any.isRequired,
};

export default Routes;
