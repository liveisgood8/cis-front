import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { PrivateRoute } from './private-route';
import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import NotFoundedPage from '../pages/not-founded-page';

interface IRoutesProps {
  browserHistory: History;
}

const Routes: React.SFC<IRoutesProps> = (props) => (
  <ConnectedRouter history={props.browserHistory}>
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path='*' exact component={NotFoundedPage} />
    </Switch>
  </ConnectedRouter>
);

Routes.propTypes = {
  browserHistory: PropTypes.any.isRequired,
};

export default Routes;
