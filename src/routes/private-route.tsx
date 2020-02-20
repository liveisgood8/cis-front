import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const isAuthenticated = false;

  let redirectPath = '';
  if (!isAuthenticated) {
    redirectPath = '/login';
  }

  if (redirectPath) {
    const renderComponent = (): JSX.Element => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
