import React from 'react';
import { useQuery } from '@apollo/client';
import { RECENTLY_DELETED_TRIBES } from './queries';
import { COLUMNS, LIMIT } from './constants';
import { PlayersQueryVariables } from '@libs/graphql/types';
import { TribeList } from './types';

import { Paper, Toolbar, Typography } from '@material-ui/core';
import Table from '@common/Table/Table';

export interface Props {
  server: string;
}

function RecentlyDeletedPlayers({ server }: Props) {
  const { loading: loadingPlayers, data } = useQuery<
    TribeList,
    PlayersQueryVariables
  >(RECENTLY_DELETED_TRIBES, {
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
  const tribes = data?.tribes?.items ?? [];
  const loading = loadingPlayers && tribes.length === 0;

  console.log(tribes, loading);
  return (
    <Paper>
      <Toolbar>
        <Typography variant="h4">Recently deleted tribes</Typography>
      </Toolbar>
      <Table
        columns={COLUMNS}
        loading={loading}
        data={tribes}
        size="small"
        hideFooter
        footerProps={{ rowsPerPage: LIMIT, rowsPerPageOptions: [LIMIT] }}
      />
    </Paper>
  );
}

export default RecentlyDeletedPlayers;
