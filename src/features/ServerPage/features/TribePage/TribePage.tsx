import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route, RouteProps } from 'react-router-dom';
import TribeProvider from './libs/TribePageContext/Provider';
import IndexPage from './features/IndexPage/IndexPage';
import HistoryPage from './features/HistoryPage/HistoryPage';
import EnnoblementsPage from './features/EnnoblementsPage/EnnoblementsPage';
import TribeChangesPage from './features/TribeChangesPage/TribeChangesPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const EnhancedRoute = ({ children, ...rest }: RouteProps) => {
  return (
    <Route {...rest}>
      <TribeProvider>{children}</TribeProvider>
    </Route>
  );
};

function TribePage() {
  return (
    <Switch>
      <EnhancedRoute exact path={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}>
        <IndexPage />
      </EnhancedRoute>
      <EnhancedRoute exact path={SERVER_PAGE.TRIBE_PAGE.HISTORY_PAGE}>
        <HistoryPage />
      </EnhancedRoute>
      <EnhancedRoute exact path={SERVER_PAGE.TRIBE_PAGE.TRIBE_CHANGES_PAGE}>
        <TribeChangesPage />
      </EnhancedRoute>
      <EnhancedRoute exact path={SERVER_PAGE.TRIBE_PAGE.ENNOBLEMENTS_PAGE}>
        <EnnoblementsPage />
      </EnhancedRoute>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default TribePage;
