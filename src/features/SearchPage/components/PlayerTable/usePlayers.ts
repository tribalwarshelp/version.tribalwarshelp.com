import { useQuery } from '@apollo/client';
import { SEARCH_PLAYER } from './queries';

import { SearchPlayerQueryVariables } from 'libs/graphql/types';
import { Player, PlayerList } from './types';

export type QueryResult = {
  players: Player[];
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
    SearchPlayerQueryVariables
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
