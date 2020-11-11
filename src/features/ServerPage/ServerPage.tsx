import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import IndexPage from './features/IndexPage/IndexPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function ServerPage() {
  return (
    <Switch>
      <Route path={SERVER_PAGE.INDEX_PAGE}>
        <IndexPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default ServerPage;
