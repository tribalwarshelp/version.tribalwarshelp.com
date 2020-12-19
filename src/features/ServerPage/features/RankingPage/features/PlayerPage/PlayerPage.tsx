import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import IndexPage from './features/IndexPage/IndexPage';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

function PlayerPage() {
  return (
    <Switch>
      <Route exact path={SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE}>
        <IndexPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default PlayerPage;
