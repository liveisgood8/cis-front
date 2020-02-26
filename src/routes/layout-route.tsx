import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import Layout from '../pages/layout';

const LayoutRoot: React.SFC<RouteProps> = ({ component: Component, ...rest }) => {
  if (!Component) {
    return null;
  }
  return (
    <Route {...rest} render={(matchProps): JSX.Element => (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    )} />
  );
};

LayoutRoot.propTypes = {
  component: PropTypes.any,
};

export default LayoutRoot;
