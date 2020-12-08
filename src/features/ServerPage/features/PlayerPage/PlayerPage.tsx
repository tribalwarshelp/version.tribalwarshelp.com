import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route, RouteProps } from 'react-router-dom';
import PlayerProvider from './libs/PlayerPageContext/Provider';
import IndexPage from './features/IndexPage/IndexPage';
import HistoryPage from './features/HistoryPage/HistoryPage';
import EnnoblementsPage from './features/EnnoblementsPage/EnnoblementsPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const EnhancedRoute = ({ children, ...rest }: RouteProps) => {
  return (
    <Route {...rest}>
      <PlayerProvider>{children}</PlayerProvider>
    </Route>
  );
};

function PlayerPage() {
  return (
    <Switch>
      <EnhancedRoute exact path={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}>
        <IndexPage />
      </EnhancedRoute>
      <EnhancedRoute exact path={SERVER_PAGE.PLAYER_PAGE.HISTORY_PAGE}>
        <HistoryPage />
      </EnhancedRoute>
      <EnhancedRoute exact path={SERVER_PAGE.PLAYER_PAGE.ENNOBLEMENTS_PAGE}>
        <EnnoblementsPage />
      </EnhancedRoute>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default PlayerPage;
