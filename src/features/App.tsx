import 'fontsource-roboto/latin-ext.css';
import React, { Fragment } from 'react';
import * as ROUTES from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import ScrollToTop from '@common/ScrollToTop/ScrollToTop';

import IndexPage from './IndexPage/IndexPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import ServerPage from './ServerPage/ServerPage';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path={ROUTES.INDEX_PAGE} exact>
          <IndexPage />
        </Route>
        <Route path={ROUTES.SERVER_PAGE.BASE}>
          <ServerPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <CssBaseline />
      <ScrollToTop />
    </Fragment>
  );
}

export default App;
