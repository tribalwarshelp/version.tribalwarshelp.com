import React from 'react';
import useServer from '../../libs/ServerContext/useServer';

import { Container, Grid } from '@material-ui/core';
import PageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import RecentlyDeletedPlayers from './components/RecentlyDeletedPlayers/RecentlyDeletedPlayers';
import RecentlyDeletedTribes from './components/RecentlyDeletedTribes/RecentlyDeletedTribes';

function IndexPage() {
  const { key } = useServer();
  return (
    <PageLayout>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <RecentlyDeletedPlayers server={key} />
          </Grid>
          <Grid item xs={6}>
            <RecentlyDeletedTribes server={key} />
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

export default IndexPage;
