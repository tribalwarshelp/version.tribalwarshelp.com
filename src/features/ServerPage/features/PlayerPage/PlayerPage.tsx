import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import PlayerProvider from './libs/PlayerPageContext/Provider';
import PageLayout from './common/PageLayout/PageLayout';
import IndexPage from './features/IndexPage/IndexPage';
import HistoryPage from './features/HistoryPage/HistoryPage';
import EnnoblementsPage from './features/EnnoblementsPage/EnnoblementsPage';
import TribeChangesPage from './features/TribeChangesPage/TribeChangesPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function PlayerPage() {
  return (
    <PlayerProvider>
      <PageLayout>
        <Switch>
          <Route exact path={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}>
            <IndexPage />
          </Route>
          <Route exact path={SERVER_PAGE.PLAYER_PAGE.HISTORY_PAGE}>
            <HistoryPage />
          </Route>
          <Route exact path={SERVER_PAGE.PLAYER_PAGE.TRIBE_CHANGES_PAGE}>
            <TribeChangesPage />
          </Route>
          <Route exact path={SERVER_PAGE.PLAYER_PAGE.ENNOBLEMENTS_PAGE}>
            <EnnoblementsPage />
          </Route>
          <Route path="*">
            <NotFoundPage wrapIntoServerPageLayout={false} />
          </Route>
        </Switch>
      </PageLayout>
    </PlayerProvider>
  );
}

export default PlayerPage;
