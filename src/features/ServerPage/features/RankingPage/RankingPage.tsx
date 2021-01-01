import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import PageLayout from './common/PageLayout/PageLayout';
import PlayerPage from './features/PlayerPage/PlayerPage';
import TribePage from './features/TribePage/TribePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function RankingPage() {
  return (
    <PageLayout>
      <Switch>
        <Route path={SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE}>
          <PlayerPage />
        </Route>
        <Route path={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE}>
          <TribePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </PageLayout>
  );
}

export default RankingPage;
