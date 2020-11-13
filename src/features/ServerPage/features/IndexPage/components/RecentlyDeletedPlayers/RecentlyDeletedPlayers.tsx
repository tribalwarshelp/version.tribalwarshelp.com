import React from 'react';
import { useQuery } from '@apollo/client';
import { RECENTLY_DELETED_PLAYERS } from './queries';
import { COLUMNS, LIMIT } from './constants';
import { PlayersQueryVariables } from '@libs/graphql/types';
import { PlayerList } from './types';

import { Paper, Toolbar, Typography } from '@material-ui/core';
import Table from '@common/Table/Table';

export interface Props {
  server: string;
}

function RecentlyDeletedPlayers({ server }: Props) {
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
        <Typography variant="h4">Test?</Typography>
      </Toolbar>
      <Table
        columns={COLUMNS}
        loading={loading}
        data={players}
        footerProps={{ rowsPerPage: LIMIT }}
      />
    </Paper>
  );
}

export default RecentlyDeletedPlayers;
