import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route, RouteProps } from 'react-router-dom';
import ServerProvider from '@features/ServerPage/libs/ServerContext/Provider';
import IndexPage from './features/IndexPage/IndexPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const EnhancedRoute = ({ children, ...rest }: RouteProps) => {
  return (
    <Route {...rest}>
      <ServerProvider>{children}</ServerProvider>
    </Route>
  );
};

function ServerPage() {
  return (
    <Switch>
      <EnhancedRoute path={SERVER_PAGE.INDEX_PAGE}>
        <IndexPage />
      </EnhancedRoute>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default ServerPage;
