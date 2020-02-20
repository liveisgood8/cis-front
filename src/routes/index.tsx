import * as React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { PrivateRoute } from './private-route';
import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';

interface IRoutesProps {
  browserHistory: History;
}

const Routes: React.SFC<IRoutesProps> = (props) => (
  <ConnectedRouter history={props.browserHistory}>
    <PrivateRoute exact path="/" component={HomePage} />
    <Route path="/login" component={LoginPage} />
  </ConnectedRouter>
);

Routes.propTypes = {
  browserHistory: PropTypes.any.isRequired,
};

export default Routes;
