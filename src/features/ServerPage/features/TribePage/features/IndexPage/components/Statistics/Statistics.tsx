import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import formatNumber from '@utils/formatNumber';
import { TRIBE_HISTORY } from './queries';
import { LIMIT } from './constants';

import { useTheme } from '@material-ui/core/styles';
import { Paper, useMediaQuery } from '@material-ui/core';
import LineChart from '@common/Chart/LineChart';
import ModeSelector from '@common/ModeSelector/ModeSelector';

import { TFunction } from 'i18next';
import { Serie } from '@nivo/line';
import { TribeHistoryQueryVariables } from '@libs/graphql/types';
import { Mode, TribeHistory } from './types';

export interface Props {
  server: string;
  tribeID: number;
  t: TFunction;
}

function Statistics({ t, server, tribeID }: Props) {
  const [mode, setMode] = useState<Mode>('points');
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: queryRes, loading } = useQuery<
    TribeHistory,
    TribeHistoryQueryVariables
  >(TRIBE_HISTORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: ['createDate DESC'],
      filter: {
        tribeID: [tribeID],
      },
      server,
    },
  });
  const items = useMemo(
    () =>
      [...(queryRes?.tribeHistory?.items ?? [])]
        .slice(0, isMobileDevice ? 20 : undefined)
        .reverse(),
    [queryRes, isMobileDevice]
  );
  const data = useMemo<Serie[]>(() => {
    if (loading) return [];
    return [
      {
        id: t<string>('statistics.modes.' + mode),
        data: items.map(item => ({
          x: new Date(item.createDate),
          y: item[mode],
        })),
      },
    ];
  }, [items, loading, t, mode]);
  const xyFormat = (v: string | number | Date) =>
    typeof v === 'string' || typeof v === 'number'
      ? formatNumber('commas', v)
      : v.toLocaleString();

  return (
    <Paper>
      <ModeSelector
        onSelect={m => setMode(m.name as Mode)}
        modes={[
          {
            name: 'points',
            label: t('statistics.modes.points'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'totalVillages',
            label: t('statistics.modes.totalVillages'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreAtt',
            label: t('statistics.modes.scoreAtt'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreDef',
            label: t('statistics.modes.scoreDef'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreTotal',
            label: t('statistics.modes.scoreTotal'),
            get selected() {
              return this.name === mode;
            },
          },
        ]}
      />
      <div style={{ height: '300px' }}>
        <LineChart
          loading={loading}
          data={data}
          margin={{ top: 20, right: 90, bottom: 50, left: 85 }}
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
            format: xyFormat,
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          colors={{ scheme: 'nivo' }}
          yFormat={xyFormat}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 90,
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

export default Statistics;
