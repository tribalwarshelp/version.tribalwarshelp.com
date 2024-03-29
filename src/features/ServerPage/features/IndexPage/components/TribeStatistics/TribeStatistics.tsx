import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import useDateUtils from 'libs/date/useDateUtils';
import { STATISTICS } from './queries';
import { LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import { Serie } from '@nivo/line';
import LineChart from 'common/Chart/LineChart';
import TableToolbar from 'common/Table/TableToolbar';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { QueryServerStatsArgs, Query } from 'libs/graphql/types';

export interface Props {
  server: string;
  t: TFunction;
}

function TribeStatistics({ server, t }: Props) {
  const dateUtils = useDateUtils();
  const { loading: loadingData, data: queryRes } = useQuery<
    Pick<Query, 'serverStats'>,
    QueryServerStatsArgs
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
        data: items.map(item => {
          return {
            x: dateUtils.dateInTZ(item.createDate, 'UTC'),
            y: item.activeTribes,
          };
        }),
      },
    ];
  }, [items, loading, t, dateUtils]);

  return (
    <Paper size="large" style={{ overflow: 'visible' }}>
      <TableToolbar>
        <Typography variant="h4">{t('tribeStatistics.title')}</Typography>
      </TableToolbar>
      <div style={{ height: '300px' }}>
        <LineChart
          data={data}
          loading={loading}
          margin={{ top: 20, right: 45, bottom: 50, left: 45 }}
          xScale={{
            type: 'time',
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
            tickValues: 'every 8 days',
            tickPadding: 5,
            tickRotation: 0,
            format: '%Y-%m-%d',
          }}
          axisLeft={{
            legendOffset: -42,
            legendPosition: 'middle',
            tickSize: 0,
            tickPadding: 7,
          }}
          pointSize={8}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-6}
          useMesh={true}
          colors={{ scheme: 'nivo' }}
        />
      </div>
    </Paper>
  );
}

export default TribeStatistics;
