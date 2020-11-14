import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/routes';
import { DAILY_PLAYER_STATS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { DailyPlayerStatsQueryVariables } from '@libs/graphql/types';
import { DailyPlayerStatsList, DailyPlayerStatsRecord } from './types';
import { subHours } from 'date-fns';

export interface Props {
  server: string;
  t: TFunction;
}

function DailyAchievementsPlayers({ server, t }: Props) {
  const createDateGT = useRef(subHours(new Date(), 30));
  const [mode, setMode] = useState<
    'scoreAtt' | 'scoreDef' | 'scoreSup' | 'scoreTotal' | 'points' | 'villages'
  >('scoreAtt');
  const { loading: loadingData, data } = useQuery<
    DailyPlayerStatsList,
    DailyPlayerStatsQueryVariables
  >(DAILY_PLAYER_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        limit: LIMIT,
        sort: mode + ' DESC',
        createDateGT: createDateGT.current,
      },
      server,
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
            params={{ key: server }}
          >
            {t('dailyAchievementsPlayers.title')}
          </Link>
        </Typography>
      </TableToolbar>
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 0
              ? (record: DailyPlayerStatsRecord) => (
                  <Link
                    to={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
                    params={{ key: server, id: record.player.id }}
                  >
                    {record.player.name}
                  </Link>
                )
              : index === 1
              ? (record: DailyPlayerStatsRecord) =>
                  record[mode].toLocaleString()
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

export default DailyAchievementsPlayers;
