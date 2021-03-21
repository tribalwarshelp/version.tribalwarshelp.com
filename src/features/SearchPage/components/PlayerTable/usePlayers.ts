import { useQuery } from '@apollo/client';
import { SEARCH_PLAYER } from './queries';

import { QuerySearchPlayerArgs, FoundPlayer } from 'libs/graphql/types';
import { PlayerList } from './types';

export type QueryResult = {
  players: FoundPlayer[];
  loading: boolean;
  total: number;
};

const usePlayers = (
  version: string,
  page: number,
  limit: number,
  q: string
): QueryResult => {
  const id = parseInt(q, 10);
  const skip = q.trim() === '';
  const { loading: loadingPlayers, data } = useQuery<
    PlayerList,
    QuerySearchPlayerArgs
  >(SEARCH_PLAYER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: ['server ASC', 'mostPoints DESC'],
      version,
      name: '%' + q + '%',
      id: !isNaN(id) && id > 0 ? id : undefined,
    },
    skip,
  });
  const players = data?.foundPlayers?.items ?? [];
  const loading = loadingPlayers && players.length === 0 && !skip;
  const total = data?.foundPlayers?.total ?? 0;

  return {
    players,
    loading,
    total,
  };
};

export default usePlayers;
