import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import PlayerPage from './features/PlayerPage/PlayerPage';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

function RankingPage() {
  return (
    <Switch>
      <Route path={SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE}>
        <PlayerPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default RankingPage;
