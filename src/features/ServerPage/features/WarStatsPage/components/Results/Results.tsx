import React from 'react';
import { useTranslation } from 'react-i18next';
import formatNumber from '@utils/formatNumber';
import { SERVER_PAGE } from '@config/namespaces';

import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Grid,
} from '@material-ui/core';
import BarChart from '@common/Chart/BarChart';
import OneSideResult from './OneSideResult';
import ChartWrapper from './ChartWrapper';

import { Results as ResultsT } from '../../types';

export interface Props {
  data: ResultsT;
  server: string;
}

function Results({ data, server }: Props) {
  const theme = useTheme();
  const isWidthDown750 = useMediaQuery(theme.breakpoints.down(750));
  const { t } = useTranslation(SERVER_PAGE.WAR_STATS_PAGE);
  const tooltipFormat = (v: string | number | Date) =>
    typeof v === 'string' || typeof v === 'number'
      ? formatNumber('commas', v)
      : v.toLocaleString();

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {t('sections.results')}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <OneSideResult
              server={server}
              title={t('results.sideOne')}
              data={data.sideOne}
              t={t}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OneSideResult
              server={server}
              title={t('results.sideTwo')}
              data={data.sideTwo}
              t={t}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom>
              {t('results.ennoblementsAgainstOppositeSide')}
            </Typography>
            <Typography>
              {t('results.sideOne')}:{' '}
              <strong>
                {formatNumber('commas', data.sideOne.againstOppositeSide)}
              </strong>
            </Typography>
            <Typography>
              {t('results.sideTwo')}:{' '}
              <strong>
                {formatNumber('commas', data.sideTwo.againstOppositeSide)}
              </strong>
            </Typography>
            <Typography>
              {t('results.difference')}:{' '}
              <strong>{formatNumber('commas', data.difference)}</strong>
            </Typography>
          </Grid>
        </Grid>
        <ChartWrapper>
          <BarChart
            data={[
              {
                id: t('results.sideOne'),
                val1: data.sideOne.gained,
                val1Label: t('results.chart.sideOneGained'),
                val2: data.sideOne.lost,
                val2Label: t('results.chart.sideOneLost'),
              },
              {
                id: t('results.sideTwo'),
                val1: data.sideTwo.gained,
                val1Label: t('results.chart.sideTwoGained'),
                val2: data.sideTwo.lost,
                val2Label: t('results.chart.sideTwoLost'),
              },
              {
                id: t('results.ennoblementsAgainstOppositeSide'),
                val1: data.sideOne.againstOppositeSide,
                val1Label: t('results.sideOne'),
                val2: data.sideTwo.againstOppositeSide,
                val2Label: t('results.sideTwo'),
              },
            ]}
            keys={['val1', 'val2']}
            colors={['green', 'red']}
            indexBy="id"
            margin={{ top: 30, right: 35, bottom: 30, left: 35 }}
            padding={0.1}
            groupMode="grouped"
            tooltipFormat={tooltipFormat}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickPadding: 5,
              tickRotation: 0,
              format: isWidthDown750 ? () => '' : undefined,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              format: tooltipFormat,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default Results;
