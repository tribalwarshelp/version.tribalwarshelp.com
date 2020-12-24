import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import usePlayer from '../../libs/PlayerPageContext/usePlayer';
import formatNumber from '@utils/formatNumber';
import { DATE_FORMAT } from '@config/app';
import { SERVER_PAGE } from '@config/namespaces';
import * as ROUTES from '@config/routes';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Hidden,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@material-ui/core';
import Link from '@common/Link/Link';
import PageLayout from '../../common/PageLayout/PageLayout';
import Statistics from './components/Statistics/Statistics';
import NameChanges from './components/NameChanges/NameChanges';

function IndexPage() {
  const classes = useStyles();
  const { key } = useServer();
  const player = usePlayer();
  const { t } = useTranslation(SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE);
  useTitle(t('title', { key, name: player.name }));

  return (
    <PageLayout>
      <Container>
        <Grid container spacing={2}>
          <Grid component={Hidden} xsDown implementation="css" item xs={12}>
            <Statistics server={key} playerID={player.id} t={t} />
          </Grid>
          {[
            {
              field: 'joinedAt',
              value: format(
                new Date(player.joinedAt),
                DATE_FORMAT.DAY_MONTH_AND_YEAR
              ),
            },
            {
              field: 'points',
              value: `${formatNumber('commas', player.points)} (#${
                player.rank
              })`,
            },
            {
              field: 'totalVillages',
              value: formatNumber('commas', player.totalVillages),
            },
            {
              field: 'dailyGrowth',
              value: formatNumber('commas', player.dailyGrowth),
            },
            {
              field: 'scoreAtt',
              value: `${formatNumber('commas', player.scoreAtt)} (#${
                player.rankAtt
              })`,
            },
            {
              field: 'scoreDef',
              value: `${formatNumber('commas', player.scoreDef)} (#${
                player.rankDef
              })`,
            },
            {
              field: 'scoreSup',
              value: `${formatNumber('commas', player.scoreSup)} (#${
                player.rankSup
              })`,
            },
            {
              field: 'scoreTotal',
              value: `${formatNumber('commas', player.scoreTotal)} (#${
                player.rankTotal
              })`,
            },
            {
              field: 'deletedAt',
              value: player.deletedAt
                ? format(
                    new Date(player.deletedAt),
                    DATE_FORMAT.DAY_MONTH_AND_YEAR
                  )
                : '-',
            },
            {
              field: 'bestRank',
              subtitle: format(
                new Date(player.bestRankAt),
                DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
              ),
              value: player.bestRank,
            },
            {
              field: 'mostPoints',
              subtitle: format(
                new Date(player.mostPointsAt),
                DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
              ),
              value: formatNumber('commas', player.mostPoints),
            },
            {
              field: 'mostVillages',
              subtitle: format(
                new Date(player.bestRankAt),
                DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
              ),
              value: formatNumber('commas', player.mostVillages),
            },
          ].map(({ field, value, subtitle }) => {
            return (
              <Grid key={field} item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {t('fields.' + field)}
                      <br />
                      {subtitle && (
                        <Typography variant="subtitle2" component="span">
                          {subtitle}
                        </Typography>
                      )}
                    </Typography>
                    <Typography variant="h4">{value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {t('fields.servers')}
                </Typography>
                <div className={classes.serverContainer}>
                  {[...player.servers].sort().map(server => {
                    return (
                      <Link
                        key={server}
                        to={ROUTES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
                        params={{ key: server, id: player.id }}
                      >
                        <Chip
                          className={classes.chip}
                          color="secondary"
                          label={server}
                          clickable
                        />
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <NameChanges t={t} nameChanges={player.nameChanges} />
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
  },
  serverContainer: {
    textAlign: 'justify',
  },
  chip: {
    margin: theme.spacing(0.5),
    cursor: 'pointer',
  },
}));

export default IndexPage;
