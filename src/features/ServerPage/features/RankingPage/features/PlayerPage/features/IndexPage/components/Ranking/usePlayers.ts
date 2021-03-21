import { useQuery } from '@apollo/client';
import { PLAYERS } from './queries';

import { QueryPlayersArgs, Player, Query } from 'libs/graphql/types';

export type QueryResult = {
  players: Player[];
  loading: boolean;
  total: number;
};

const usePlayers = (
  page: number,
  limit: number,
  server: string,
  q: string
): QueryResult => {
  const { loading: loadingPlayers, data } = useQuery<
    Pick<Query, 'players'>,
    QueryPlayersArgs
  >(PLAYERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: ['rank ASC'],
      filter: {
        exists: true,
        nameIEQ: '%' + q + '%',
      },
      server,
    },
  });
  const players = data?.players?.items ?? [];
  const loading = loadingPlayers && players.length === 0;
  const total = data?.players?.total ?? 0;

  return {
    players,
    loading,
    total,
  };
};

export default usePlayers;
