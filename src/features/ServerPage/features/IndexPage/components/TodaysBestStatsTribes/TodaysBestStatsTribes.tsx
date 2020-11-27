import React, { useRef, useState } from 'react';
import { subHours } from 'date-fns';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/routes';
import { DAILY_TRIBE_STATS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import ModeSelector from '@features/ServerPage/common/ModeSelector/ModeSelector';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { DailyTribeStatsQueryVariables } from '@libs/graphql/types';
import { DailyTribeStatsList, DailyTribeStatsRecord, Mode } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function TodaysBestStatsTribes({ server, t }: Props) {
  const createDateGT = useRef(subHours(new Date(), 30));
  const [mode, setMode] = useState<Mode>('scoreAtt');
  const { loading: loadingData, data } = useQuery<
    DailyTribeStatsList,
    DailyTribeStatsQueryVariables
  >(DAILY_TRIBE_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: [mode + ' DESC'],
      filter: {
        createDateGT: createDateGT.current,
      },
      server,
    },
  });
  const records = data?.dailyTribeStats?.items ?? [];
  const loading = loadingData && records.length === 0;

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">
          <Link
            to={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.DAILY_PAGE}
            params={{ key: server }}
          >
            {t('todaysBestStatsTribes.title')}
          </Link>
        </Typography>
      </TableToolbar>
      <ModeSelector
        buttonProps={{
          variant: 'outlined',
        }}
        onSelect={m => setMode(m.name as Mode)}
        modes={[
          {
            name: 'scoreAtt',
            label: t('todaysBestStatsTribes.modes.scoreAtt'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreDef',
            label: t('todaysBestStatsTribes.modes.scoreDef'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreTotal',
            label: t('todaysBestStatsTribes.modes.scoreTotal'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'points',
            label: t('todaysBestStatsTribes.modes.points'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'villages',
            label: t('todaysBestStatsTribes.modes.villages'),
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
              ? (record: DailyTribeStatsRecord) => (
                  <Link
                    to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                    params={{ key: server, id: record.tribe.id }}
                  >
                    {record.tribe.tag}
                  </Link>
                )
              : index === 1
              ? (record: DailyTribeStatsRecord) => record[mode].toLocaleString()
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

export default TodaysBestStatsTribes;
