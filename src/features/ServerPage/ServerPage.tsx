import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import ServerProvider from './libs/ServerContext/Provider';
import PageLayout from './common/PageLayout/PageLayout';
import IndexPage from './features/IndexPage/IndexPage';
import PlayerPage from './features/PlayerPage/PlayerPage';
import TribePage from './features/TribePage/TribePage';
import VillagePage from './features/VillagePage/VillagePage';
import RankingPage from './features/RankingPage/RankingPage';
import MapPage from './features/MapPage/MapPage';
import EnnoblementsPage from './features/EnnoblementsPage/EnnoblementsPage';
import WarStatsPage from './features/WarStatsPage/WarStatsPage';
import NotFoundPage from './features/NotFoundPage/NotFoundPage';

function ServerPage() {
  return (
    <ServerProvider>
      <PageLayout>
        <Switch>
          <Route exact path={SERVER_PAGE.INDEX_PAGE}>
            <IndexPage />
          </Route>
          <Route path={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}>
            <PlayerPage />
          </Route>
          <Route path={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}>
            <TribePage />
          </Route>
          <Route exact path={SERVER_PAGE.VILLAGE_PAGE.INDEX_PAGE}>
            <VillagePage />
          </Route>
          <Route path={SERVER_PAGE.RANKING_PAGE.BASE}>
            <RankingPage />
          </Route>
          <Route path={SERVER_PAGE.MAP_PAGE}>
            <MapPage />
          </Route>
          <Route exact path={SERVER_PAGE.ENNOBLEMENTS_PAGE}>
            <EnnoblementsPage />
          </Route>
          <Route exact path={SERVER_PAGE.WAR_STATS_PAGE}>
            <WarStatsPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </PageLayout>
    </ServerProvider>
  );
}

export default ServerPage;
