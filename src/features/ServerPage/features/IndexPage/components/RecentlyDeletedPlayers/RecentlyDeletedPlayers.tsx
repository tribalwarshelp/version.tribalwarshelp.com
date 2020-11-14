import React from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/routes';
import { RECENTLY_DELETED_PLAYERS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Paper, Typography } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import { PlayersQueryVariables } from '@libs/graphql/types';
import { PlayerList, Player } from './types';

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

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">
          {t('recentlyDeletedPlayers.title')}
        </Typography>
      </TableToolbar>
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 0
              ? (player: Player) => (
                  <Link
                    to={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
                    params={{ key: server, id: player.id }}
                  >
                    {player.name}
                  </Link>
                )
              : column.valueFormatter,
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