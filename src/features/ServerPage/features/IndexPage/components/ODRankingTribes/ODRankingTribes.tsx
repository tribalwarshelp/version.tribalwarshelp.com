import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/routes';
import { TRIBES } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import Paper from '../Paper/Paper';
import ModeSelector from '../ModeSelector/ModeSelector';

import { TFunction } from 'i18next';
import { TribesQueryVariables } from '@libs/graphql/types';
import { TribesList, Mode, Tribe } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function ODRankingTribes({ server, t }: Props) {
  const [mode, setMode] = useState<Mode>('rankTotal');
  const { loading: loadingData, data } = useQuery<
    TribesList,
    TribesQueryVariables
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

  const formatScore = (p: Tribe): string => {
    switch (mode) {
      case 'rankAtt':
        return p.scoreAtt.toLocaleString();
      case 'rankDef':
        return p.scoreDef.toLocaleString();
      case 'rankTotal':
        return p.scoreTotal.toLocaleString();
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
              ? (tribe: Tribe) => tribe[mode].toLocaleString()
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
