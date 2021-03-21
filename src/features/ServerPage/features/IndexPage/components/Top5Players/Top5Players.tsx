import React from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from 'config/routes';
import { TOP_5_PLAYERS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from 'common/Table/TableToolbar';
import Table from 'common/Table/Table';
import Link from 'common/Link/Link';
import PlayerProfileLink from 'features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { QueryPlayersArgs, Player, Query } from 'libs/graphql/types';

export interface Props {
  server: string;
  t: TFunction;
}

function Top5Players({ server, t }: Props) {
  const { loading: loadingPlayers, data } = useQuery<
    Pick<Query, 'players'>,
    QueryPlayersArgs
  >(TOP_5_PLAYERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: ['rank ASC'],
      filter: {
        exists: true,
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
          <Link
            to={SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE}
            params={{ key: server }}
          >
            {t('top5Players.title')}
          </Link>
        </Typography>
      </TableToolbar>
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 1
              ? (player: Player) => (
                  <PlayerProfileLink player={player} server={server} />
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

export default Top5Players;
