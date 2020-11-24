import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { STATISTICS } from './queries';
import { LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import { Serie } from '@nivo/line';
import LineChart from '@common/Chart/LineChart';
import TableToolbar from '@common/Table/TableToolbar';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { ServerStatsQueryVariables } from '@libs/graphql/types';
import { ServerStats } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function TribeStatistics({ server, t }: Props) {
  const { loading: loadingData, data: queryRes } = useQuery<
    ServerStats,
    ServerStatsQueryVariables
  >(STATISTICS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: ['createDate DESC'],
      server,
    },
  });
  const items = useMemo(
    () => [...(queryRes?.serverStats?.items ?? [])].reverse(),
    [queryRes]
  );
  const loading = loadingData && items.length === 0;
  const data = useMemo<Serie[]>(() => {
    if (loading) return [];
    return [
      {
        id: t<string>('tribeStatistics.tribes'),
        data: items.map(item => ({
          x: new Date(item.createDate),
          y: item.activeTribes,
        })),
      },
    ];
  }, [items, loading, t]);

  return (
    <Paper size="large" style={{ overflow: 'hidden' }}>
      <TableToolbar>
        <Typography variant="h4">{t('tribeStatistics.title')}</Typography>
      </TableToolbar>
      <div style={{ height: '300px' }}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 100, bottom: 50, left: 45 }}
          xScale={{
            type: 'time',
            precision: 'day',
          }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          xFormat="time:%Y-%m-%d"
          axisBottom={{
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '%Y-%m-%d',
          }}
          axisLeft={{
            legendOffset: -42,
            legendPosition: 'middle',
            tickSize: 0,
            tickPadding: 4,
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          colors={{ scheme: 'nivo' }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            },
          ]}
        />
      </div>
    </Paper>
  );
}

export default TribeStatistics;
