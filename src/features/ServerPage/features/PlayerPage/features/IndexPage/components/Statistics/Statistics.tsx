import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import useDateUtils from '@libs/date/useDateUtils';
import formatNumber from '@utils/formatNumber';
import { PLAYER_HISTORY } from './queries';
import { LIMIT } from './constants';

import { useTheme } from '@material-ui/core/styles';
import { Paper, useMediaQuery } from '@material-ui/core';
import LineChart from '@common/Chart/LineChart';
import ModeSelector from '@common/ModeSelector/ModeSelector';

import { TFunction } from 'i18next';
import { Serie } from '@nivo/line';
import { PlayerHistoryQueryVariables } from '@libs/graphql/types';
import { Mode, PlayerHistory } from './types';

export interface Props {
  server: string;
  playerID: number;
  t: TFunction;
}

function Statistics({ t, server, playerID }: Props) {
  const [mode, setMode] = useState<Mode>('points');
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const dateUtils = useDateUtils();
  const { data: queryRes, loading } = useQuery<
    PlayerHistory,
    PlayerHistoryQueryVariables
  >(PLAYER_HISTORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: ['createDate DESC'],
      filter: {
        playerID: [playerID],
      },
      server,
    },
  });
  const items = useMemo(
    () =>
      [...(queryRes?.playerHistory?.items ?? [])]
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
          x: dateUtils.dateInTZ(item.createDate, 'UTC'),
          y: item[mode],
        })),
      },
    ];
  }, [items, loading, t, mode, dateUtils]);
  const xyFormat = (v: string | number | Date) =>
    typeof v === 'string' || typeof v === 'number'
      ? formatNumber('commas', v)
      : v.toLocaleString();

  return (
    <Paper>
      <ModeSelector
        onSelect={m => setMode(m.name as Mode)}
        buttonProps={{ size: 'medium' }}
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
            name: 'scoreSup',
            label: t('statistics.modes.scoreSup'),
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
          margin={{ top: 20, right: 45, bottom: 50, left: 85 }}
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
            format: xyFormat,
          }}
          pointSize={8}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-6}
          useMesh={true}
          colors={{ scheme: 'nivo' }}
          yFormat={xyFormat}
        />
      </div>
    </Paper>
  );
}

export default Statistics;
