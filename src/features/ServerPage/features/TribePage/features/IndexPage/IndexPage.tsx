import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useTribe from '../../libs/TribePageContext/useTribe';
import formatNumber from '@utils/formatNumber';
import { DATE_FORMAT } from '@config/app';
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
  const tribe = useTribe();
  const { t } = useTranslation(SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE);
  useTitle(t('title', { key, tag: tribe.tag }));

  return (
    <PageLayout>
      <Container>
        <Grid container spacing={2}>
          <Grid component={Hidden} xsDown implementation="css" item xs={12}>
            <Statistics server={key} tribeID={tribe.id} t={t} />
          </Grid>
          {[
            {
              field: 'createdAt',
              value: format(
                new Date(tribe.createdAt),
                DATE_FORMAT.DAY_MONTH_AND_YEAR
              ),
            },
            {
              field: 'points',
              value: `${tribe.points.toLocaleString()} (#${tribe.rank})`,
            },
            {
              field: 'allPoints',
              value: `${tribe.allPoints.toLocaleString()}`,
            },
            {
              field: 'totalVillages',
              value: tribe.totalVillages.toLocaleString(),
            },
            {
              field: 'dominance',
              value: formatNumber('dominance', tribe.dominance),
            },
            {
              field: 'scoreAtt',
              value: `${tribe.scoreAtt.toLocaleString()} (#${tribe.rankAtt})`,
            },
            {
              field: 'scoreDef',
              value: `${tribe.scoreDef.toLocaleString()} (#${tribe.rankDef})`,
            },
            {
              field: 'scoreTotal',
              value: `${tribe.scoreTotal.toLocaleString()} (#${
                tribe.rankTotal
              })`,
            },
            {
              field: 'deletedAt',
              value: tribe.deletedAt
                ? format(
                    new Date(tribe.deletedAt),
                    DATE_FORMAT.DAY_MONTH_AND_YEAR
                  )
                : '-',
            },
            {
              field: 'bestRank',
              subtitle: format(
                new Date(tribe.bestRankAt),
                DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
              ),
              value: `${tribe.bestRank.toString()}`,
            },
            {
              field: 'mostPoints',
              subtitle: format(
                new Date(tribe.mostPointsAt),
                DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
              ),
              value: `${tribe.mostPoints.toLocaleString()}`,
            },
            {
              field: 'mostVillages',
              subtitle: format(
                new Date(tribe.bestRankAt),
                DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
              ),
              value: `${tribe.mostVillages.toLocaleString()}`,
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
