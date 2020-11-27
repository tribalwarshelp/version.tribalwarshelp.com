import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import usePlayer from '../../libs/PlayerPageContext/usePlayer';
import { SERVER_PAGE } from '@config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Hidden,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import PageLayout from '../../common/PageLayout/PageLayout';
import Statistics from './components/Statistics/Statistics';

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
          <Grid component={Hidden} smDown implementation="css" item xs={12}>
            <Statistics server={key} playerID={player.id} t={t} />
          </Grid>
          {[
            {
              field: 'joinedAt',
              value: format(new Date(player.joinedAt), 'yyyy-MM-dd HH:mm'),
            },
            {
              field: 'points',
              value: `${player.points.toLocaleString()} (#${player.rank})`,
            },
            {
              field: 'totalVillages',
              value: player.totalVillages.toLocaleString(),
            },
            {
              field: 'dailyGrowth',
              value: player.dailyGrowth.toLocaleString(),
            },
            {
              field: 'scoreAtt',
              value: `${player.scoreAtt.toLocaleString()} (#${player.rankAtt})`,
            },
            {
              field: 'scoreDef',
              value: `${player.scoreDef.toLocaleString()} (#${player.rankDef})`,
            },
            {
              field: 'scoreSup',
              value: `${player.scoreSup.toLocaleString()} (#${player.rankSup})`,
            },
            {
              field: 'scoreTotal',
              value: `${player.scoreTotal.toLocaleString()} (#${
                player.rankTotal
              })`,
            },
            {
              field: 'deletedAt',
              value: player.deletedAt
                ? format(new Date(player.deletedAt), 'yyyy-MM-dd HH:mm')
                : '-',
            },
            {
              field: 'bestRank',
              subtitle: format(new Date(player.bestRankAt), 'yyyy-MM-dd HH:mm'),
              value: `${player.bestRank.toString()}`,
            },
            {
              field: 'mostPoints',
              subtitle: format(
                new Date(player.mostPointsAt),
                'yyyy-MM-dd HH:mm'
              ),
              value: `${player.mostPoints.toLocaleString()}`,
            },
            {
              field: 'mostVillages',
              subtitle: format(new Date(player.bestRankAt), 'yyyy-MM-dd HH:mm'),
              value: `${player.mostVillages.toLocaleString()}`,
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
                        <Typography variant="subtitle1" component="span">
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
        </Grid>
      </Container>
    </PageLayout>
  );
}

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
  },
}));

export default IndexPage;
