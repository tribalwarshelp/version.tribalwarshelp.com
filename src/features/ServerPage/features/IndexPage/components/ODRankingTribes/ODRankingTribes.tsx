import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import formatNumber from 'utils/formatNumber';
import { SERVER_PAGE } from 'config/routes';
import { TRIBES } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from 'common/Table/TableToolbar';
import Table from 'common/Table/Table';
import Link from 'common/Link/Link';
import ModeSelector from 'common/ModeSelector/ModeSelector';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { QueryTribesArgs, Query, Tribe } from 'libs/graphql/types';
import { Mode } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function ODRankingTribes({ server, t }: Props) {
  const [mode, setMode] = useState<Mode>('rankTotal');
  const { loading: loadingData, data } = useQuery<
    Pick<Query, 'tribes'>,
    QueryTribesArgs
  >(TRIBES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: [mode + ' ASC'],
      filter: {
        exists: true,
        [mode + 'GTE']: 1,
      },
      server,
    },
  });
  const items = data?.tribes?.items ?? [];
  const loading = loadingData && items.length === 0;

  const formatScore = (tribe: Tribe): string => {
    switch (mode) {
      case 'rankAtt':
        return formatNumber('commas', tribe.scoreAtt);
      case 'rankDef':
        return formatNumber('commas', tribe.scoreDef);
      case 'rankTotal':
        return formatNumber('commas', tribe.scoreTotal);
    }
  };

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">
          <Link
            to={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.OD_PAGE}
            params={{ key: server }}
          >
            {t('odRankingTribes.title')}
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
            name: 'rankAtt',
            label: t('odRankingTribes.modes.rankAtt'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'rankDef',
            label: t('odRankingTribes.modes.rankDef'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'rankTotal',
            label: t('odRankingTribes.modes.rankTotal'),
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
            index === 1
              ? (tribe: Tribe) => (
                  <Link
                    to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                    params={{ key: server, id: tribe.id }}
                  >
                    {tribe.tag}
                  </Link>
                )
              : index === 0
              ? (tribe: Tribe) => formatNumber('commas', tribe[mode])
              : index === 2
              ? formatScore
              : column.valueFormatter,
          label: column.label ? t<string>(column.label) : '',
        }))}
        loading={loading}
        data={items}
        size="small"
        hideFooter
        footerProps={{ rowsPerPage: LIMIT, rowsPerPageOptions: [LIMIT] }}
      />
    </Paper>
  );
}

export default ODRankingTribes;
