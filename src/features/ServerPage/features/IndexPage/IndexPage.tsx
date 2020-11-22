import React from 'react';
import { useTranslation } from 'react-i18next';
import useServer from '../../libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container, Grid } from '@material-ui/core';
import PageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import TodaysBestStatsPlayers from './components/TodaysBestStatsPlayers/TodaysBestStatsPlayers';
import RecentlyDeletedPlayers from './components/RecentlyDeletedPlayers/RecentlyDeletedPlayers';
import RecentlyDeletedTribes from './components/RecentlyDeletedTribes/RecentlyDeletedTribes';

function IndexPage() {
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.INDEX_PAGE);
  return (
    <PageLayout>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TodaysBestStatsPlayers server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentlyDeletedPlayers server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentlyDeletedTribes server={key} t={t} />
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

export default IndexPage;
