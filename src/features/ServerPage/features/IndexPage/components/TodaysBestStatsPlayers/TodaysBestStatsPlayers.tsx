import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import useServer from 'features/ServerPage/libs/ServerContext/useServer';
import useDateUtils from 'libs/date/useDateUtils';
import formatNumber from 'utils/formatNumber';
import { SERVER_PAGE } from 'config/routes';
import { DAILY_PLAYER_STATS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from 'common/Table/TableToolbar';
import Table from 'common/Table/Table';
import Link from 'common/Link/Link';
import PlayerProfileLink from 'features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';
import ModeSelector from 'common/ModeSelector/ModeSelector';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { DailyPlayerStatsQueryVariables } from 'libs/graphql/types';
import { DailyPlayerStatsList, DailyPlayerStatsRecord, Mode } from './types';

export interface Props {
  t: TFunction;
}

function TodaysBestStatsPlayers({ t }: Props) {
  const server = useServer();
  const dateUtils = useDateUtils();
  const [mode, setMode] = useState<Mode>('scoreAtt');
  const { loading: loadingData, data } = useQuery<
    DailyPlayerStatsList,
    DailyPlayerStatsQueryVariables
  >(DAILY_PLAYER_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: [mode + ' DESC'],
      filter: {
        createDate: dateUtils.toJSON(dateUtils.date(server.historyUpdatedAt)),
      },
      server: server.key,
    },
  });
  const records = data?.dailyPlayerStats?.items ?? [];
  const loading = loadingData && records.length === 0;

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">
          <Link
            to={SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.DAILY_PAGE}
            params={{ key: server.key }}
          >
            {t('todaysBestStatsPlayers.title')}
          </Link>
        </Typography>
      </TableToolbar>
      <ModeSelector
        onSelect={m => setMode(m.name as Mode)}
        modes={[
          {
            name: 'scoreAtt',
            label: t('todaysBestStatsPlayers.modes.scoreAtt'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreDef',
            label: t('todaysBestStatsPlayers.modes.scoreDef'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreSup',
            label: t('todaysBestStatsPlayers.modes.scoreSup'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreTotal',
            label: t('todaysBestStatsPlayers.modes.scoreTotal'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'points',
            label: t('todaysBestStatsPlayers.modes.points'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'villages',
            label: t('todaysBestStatsPlayers.modes.villages'),
            get selected() {
              return this.name === mode;
            },
          },
        ]}
      />
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 0
              ? (record: DailyPlayerStatsRecord) => (
                  <PlayerProfileLink
                    player={record.player}
                    server={server.key}
                  />
                )
              : index === 1
              ? (record: DailyPlayerStatsRecord) =>
                  formatNumber('commas', record[mode])
              : column.valueFormatter,
          label: column.label ? t<string>(column.label) : '',
        }))}
        loading={loading}
        data={records}
        size="small"
        hideFooter
        footerProps={{ rowsPerPage: LIMIT, rowsPerPageOptions: [LIMIT] }}
      />
    </Paper>
  );
}

export default TodaysBestStatsPlayers;
