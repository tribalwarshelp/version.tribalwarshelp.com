import React from 'react';
import { useQuery } from '@apollo/client';
import { PLAYERS } from './queries';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { PlayersQueryVariables } from '@libs/graphql/types';
import { PlayersQuery, Player } from './types';

export interface Props {
  server: string;
  tribeID: number;
  t: TFunction;
}

function Members({ t, server, tribeID }: Props) {
  const { data: queryData, loading: queryLoading } = useQuery<
    PlayersQuery,
    PlayersQueryVariables
  >(PLAYERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      sort: ['rank ASC'],
      filter: {
        tribeID: [tribeID],
      },
      server,
    },
  });
  const playersItems = queryData?.players?.items ?? [];
  const loading = playersItems.length === 0 && queryLoading;

  return (
    <Paper>
      <Table
        columns={[
          {
            field: 'index',
            label: '',
            sortable: false,
            valueFormatter: (_p: Player, i: number) => {
              return i + 1 + '.';
            },
          },
          {
            field: 'name',
            label: t('members.columns.name'),
            sortable: false,
            valueFormatter: (p: Player) => {
              return <PlayerProfileLink player={p} server={server} />;
            },
          },
          {
            field: 'points',
            label: t('members.columns.points'),
            sortable: false,
            valueFormatter: (p: Player) => {
              return `${p.points.toLocaleString()} (#${p.rank})`;
            },
          },
          {
            field: 'totalVillages',
            label: t('members.columns.totalVillages'),
            sortable: false,
            valueFormatter: (p: Player) => {
              return p.totalVillages.toLocaleString();
            },
          },
        ]}
        loading={loading}
        data={playersItems}
        size="small"
        hideFooter
      />
    </Paper>
  );
}

export default Members;
