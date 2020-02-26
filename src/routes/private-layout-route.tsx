import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { getAuthenticateData } from '../services/auth.service';
import LayoutRoot from './layout-route';

export const PrivateLayoutRoute: React.FC<RouteProps> = (props) => {
  const isAuthenticated = getAuthenticateData() !== null;

  let redirectPath = '';
  if (!isAuthenticated) {
    redirectPath = '/login';
  }

  if (redirectPath) {
    const renderComponent = (): JSX.Element => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <LayoutRoot {...props} />;
  }
};

export default PrivateLayoutRoute;