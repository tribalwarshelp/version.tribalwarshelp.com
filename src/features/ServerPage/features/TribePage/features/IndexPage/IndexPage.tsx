import React from 'react';
import { useTranslation } from 'react-i18next';
import useDateUtils from 'libs/date/useDateUtils';
import useTitle from 'libs/useTitle';
import useServer from 'features/ServerPage/libs/ServerContext/useServer';
import useTribe from '../../libs/TribePageContext/useTribe';
import formatNumber from 'utils/formatNumber';
import { DATE_FORMAT } from 'config/app';
import { SERVER_PAGE } from 'config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Hidden,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import Statistics from './components/Statistics/Statistics';

function IndexPage() {
  const dateUtils = useDateUtils();
  const classes = useStyles();
  const { key } = useServer();
  const tribe = useTribe();
  const { t } = useTranslation(SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE);
  useTitle(t('title', { key, tag: tribe.tag }));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid component={Hidden} xsDown implementation="css" item xs={12}>
          <Statistics server={key} tribeID={tribe.id} t={t} />
        </Grid>
        {[
          {
            field: 'createdAt',
            value: dateUtils.format(
              dateUtils.date(tribe.createdAt),
              DATE_FORMAT.DAY_MONTH_AND_YEAR
            ),
          },
          {
            field: 'points',
            value: `${formatNumber('commas', tribe.points)} (#${tribe.rank})`,
          },
          {
            field: 'allPoints',
            value: formatNumber('commas', tribe.allPoints),
          },
          {
            field: 'totalVillages',
            value: formatNumber('commas', tribe.totalVillages),
          },
          {
            field: 'dominance',
            value: formatNumber('dominance', tribe.dominance),
          },
          {
            field: 'scoreAtt',
            value: `${formatNumber('commas', tribe.scoreAtt)} (#${
              tribe.rankAtt
            })`,
          },
          {
            field: 'scoreDef',
            value: `${formatNumber('commas', tribe.scoreDef)} (#${
              tribe.rankDef
            })`,
          },
          {
            field: 'scoreTotal',
            value: `${formatNumber('commas', tribe.scoreTotal)} (#${
              tribe.rankTotal
            })`,
          },
          {
            field: 'deletedAt',
            value: tribe.deletedAt
              ? dateUtils.format(
                  dateUtils.date(tribe.deletedAt),
                  DATE_FORMAT.DAY_MONTH_AND_YEAR
                )
              : '-',
          },
          {
            field: 'bestRank',
            subtitle: dateUtils.format(
              dateUtils.date(tribe.bestRankAt),
              DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
            ),
            value: tribe.bestRank,
          },
          {
            field: 'mostPoints',
            subtitle: dateUtils.format(
              dateUtils.date(tribe.mostPointsAt),
              DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
            ),
            value: formatNumber('commas', tribe.mostPoints),
          },
          {
            field: 'mostVillages',
            subtitle: dateUtils.format(
              dateUtils.date(tribe.mostVillagesAt),
              DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR
            ),
            value: formatNumber('commas', tribe.mostVillages),
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
