import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import TribeProvider from './libs/TribePageContext/Provider';
import PageLayout from './common/PageLayout/PageLayout';
import IndexPage from './features/IndexPage/IndexPage';
import MembersPage from './features/MembersPage/MembersPage';
import HistoryPage from './features/HistoryPage/HistoryPage';
import EnnoblementsPage from './features/EnnoblementsPage/EnnoblementsPage';
import TribeChangesPage from './features/TribeChangesPage/TribeChangesPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function TribePage() {
  return (
    <TribeProvider>
      <PageLayout>
        <Switch>
          <Route exact path={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}>
            <IndexPage />
          </Route>
          <Route exact path={SERVER_PAGE.TRIBE_PAGE.MEMBERS_PAGE}>
            <MembersPage />
          </Route>
          <Route exact path={SERVER_PAGE.TRIBE_PAGE.HISTORY_PAGE}>
            <HistoryPage />
          </Route>
          <Route exact path={SERVER_PAGE.TRIBE_PAGE.TRIBE_CHANGES_PAGE}>
            <TribeChangesPage />
          </Route>
          <Route exact path={SERVER_PAGE.TRIBE_PAGE.ENNOBLEMENTS_PAGE}>
            <EnnoblementsPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </PageLayout>
    </TribeProvider>
  );
}

export default TribePage;
