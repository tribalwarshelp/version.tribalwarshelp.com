import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '../../libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container, Grid, Hidden } from '@material-ui/core';
import Content from '@common/Content/Content';
import PlayerStatistics from './components/PlayerStatistics/PlayerStatistics';
import TribeStatistics from './components/TribeStatistics/TribeStatistics';
import Top5Players from './components/Top5Players/Top5Players';
import Top5Tribes from './components/Top5Tribes/Top5Tribes';
import ODRankingPlayers from './components/ODRankingPlayers/ODRankingPlayers';
import ODRankingTribes from './components/ODRankingTribes/ODRankingTribes';
import TodaysBestStatsPlayers from './components/TodaysBestStatsPlayers/TodaysBestStatsPlayers';
import TodaysBestStatsTribes from './components/TodaysBestStatsTribes/TodaysBestStatsTribes';
import RecentlyDeletedPlayers from './components/RecentlyDeletedPlayers/RecentlyDeletedPlayers';
import RecentlyDeletedTribes from './components/RecentlyDeletedTribes/RecentlyDeletedTribes';

function IndexPage() {
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.INDEX_PAGE);
  useTitle(t('title', { key }));

  return (
    <Content component="div" minHeight={false}>
      <Container>
        <Grid container spacing={2}>
          <Grid
            component={Hidden}
            xsDown
            implementation="css"
            item
            xs={12}
            md={12}
          >
            <PlayerStatistics server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Top5Players server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Top5Tribes server={key} t={t} />
          </Grid>
          <Grid
            component={Hidden}
            xsDown
            implementation="css"
            item
            xs={12}
            md={12}
          >
            <TribeStatistics server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ODRankingPlayers server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ODRankingTribes server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TodaysBestStatsPlayers t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TodaysBestStatsTribes t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentlyDeletedPlayers server={key} t={t} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentlyDeletedTribes server={key} t={t} />
          </Grid>
        </Grid>
      </Container>
    </Content>
  );
}

export default IndexPage;
