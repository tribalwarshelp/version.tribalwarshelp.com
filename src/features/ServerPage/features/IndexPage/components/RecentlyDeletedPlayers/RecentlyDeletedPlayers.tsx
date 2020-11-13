import React from 'react';
import { useQuery } from '@apollo/client';
import { RECENTLY_DELETED_PLAYERS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { TFunction } from 'i18next';
import { PlayersQueryVariables } from '@libs/graphql/types';
import { PlayerList } from './types';

import { Paper, Toolbar, Typography } from '@material-ui/core';
import Table from '@common/Table/Table';

export interface Props {
  server: string;
  t: TFunction;
}

function RecentlyDeletedPlayers({ server, t }: Props) {
  const { loading: loadingPlayers, data } = useQuery<
    PlayerList,
    PlayersQueryVariables
  >(RECENTLY_DELETED_PLAYERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        limit: LIMIT,
        sort: 'deletedAt DESC',
        deletedAtGT: new Date(0),
      },
      server,
    },
  });
  const players = data?.players?.items ?? [];
  const loading = loadingPlayers && players.length === 0;

  console.log(players, loading);
  return (
    <Paper>
      <Toolbar>
        <Typography variant="h4">
          {t('recentlyDeletedPlayers.title')}
        </Typography>
      </Toolbar>
      <Table
        columns={COLUMNS.map(column => ({
          ...column,
          label: column.label ? t<string>(column.label) : '',
        }))}
        loading={loading}
        data={players}
        size="small"
        hideFooter
        footerProps={{ rowsPerPage: LIMIT, rowsPerPageOptions: [LIMIT] }}
      />
    </Paper>
  );
}

export default RecentlyDeletedPlayers;
