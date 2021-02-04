import React, { Fragment } from 'react';
import * as ROUTES from 'config/routes';

import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import ScrollToTop from 'common/ScrollToTop/ScrollToTop';

import VersionProvider from '../libs/VersionContext/Provider';
import DateUtilsProvider from '../libs/date/DateUtilsProvider';
import MainLayout from '../common/MainLayout/MainLayout';
import IndexPage from './IndexPage/IndexPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import SearchPage from './SearchPage/SearchPage';
import ServerPage from './ServerPage/ServerPage';

function App() {
  return (
    <Fragment>
      <VersionProvider>
        <DateUtilsProvider>
          <Switch>
            <Route path={[ROUTES.INDEX_PAGE, ROUTES.SEARCH_PAGE]} exact>
              <MainLayout>
                <Switch>
                  <Route path={ROUTES.INDEX_PAGE} exact>
                    <IndexPage />
                  </Route>
                  <Route path={ROUTES.SEARCH_PAGE} exact>
                    <SearchPage />
                  </Route>
                </Switch>
              </MainLayout>
            </Route>
            <Route path={ROUTES.SERVER_PAGE.INDEX_PAGE}>
              <ServerPage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </DateUtilsProvider>
      </VersionProvider>
      <CssBaseline />
      <ScrollToTop />
    </Fragment>
  );
}

export default App;
