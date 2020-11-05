import React, { Fragment } from 'react';
import * as ROUTES from '@config/routes';

import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import IndexPage from './IndexPage/IndexPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path={ROUTES.INDEX_PAGE} exact>
          <IndexPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      <CssBaseline />
    </Fragment>
  );
}

export default App;
