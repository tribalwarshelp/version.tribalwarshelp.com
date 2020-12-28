import React from 'react';
import { SERVER_PAGE } from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import IndexPage from './features/IndexPage/IndexPage';
import ODPage from './features/ODPage/ODPage';
import DailyPage from './features/DailyPage/DailyPage';
import ArchivePage from './features/ArchivePage/ArchivePage';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

function TribePage() {
  return (
    <Switch>
      <Route exact path={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE}>
        <IndexPage />
      </Route>
      <Route exact path={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.OD_PAGE}>
        <ODPage />
      </Route>
      <Route exact path={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.DAILY_PAGE}>
        <DailyPage />
      </Route>
      <Route exact path={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.ARCHIVE_PAGE}>
        <ArchivePage />
      </Route>
      <Route path="*">
        <NotFoundPage wrapIntoServerPageLayout={false} />
      </Route>
    </Switch>
  );
}

export default TribePage;
