import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useDateUtils from '@libs/date/useDateUtils';
import formatNumber from '@utils/formatNumber';
import { SERVER_PAGE } from '@config/routes';
import { DAILY_TRIBE_STATS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import ModeSelector from '@common/ModeSelector/ModeSelector';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { DailyTribeStatsQueryVariables } from '@libs/graphql/types';
import { DailyTribeStatsList, DailyTribeStatsRecord, Mode } from './types';

export interface Props {
  t: TFunction;
}

function TodaysBestStatsTribes({ t }: Props) {
  const server = useServer();
  const dateUtils = useDateUtils();
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
        createDate: dateUtils.toJSON(dateUtils.date(server.historyUpdatedAt)),
      },
      server: server.key,
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
            params={{ key: server.key }}
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
                    params={{ key: server.key, id: record.tribe.id }}
                  >
                    {record.tribe.tag}
                  </Link>
                )
              : index === 1
              ? (record: DailyTribeStatsRecord) =>
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

export default TodaysBestStatsTribes;
