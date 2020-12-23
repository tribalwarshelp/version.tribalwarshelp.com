import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { DAILY_PLAYER_STATS } from './queries';

import { DailyPlayerStatsQueryVariables } from '@libs/graphql/types';
import { DailyPlayerStatsRecord, DailyStats } from './types';

export type QueryResult = {
  dailyStats: DailyPlayerStatsRecord[];
  loading: boolean;
  total: number;
};

const usePlayers = (
  page: number,
  limit: number,
  server: string,
  q: string,
  sort: string
): QueryResult => {
  const { historyUpdatedAt } = useServer();
  const createDateGTE = useMemo<string>(() => {
    return historyUpdatedAt.toString().split('T')[0] + 'T00:00:00Z';
  }, [historyUpdatedAt]);
  const { loading: loadingStats, data } = useQuery<
    DailyStats,
    DailyPlayerStatsQueryVariables
  >(DAILY_PLAYER_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: [sort],
      filter: {
        playerFilter: {
          exists: true,
          nameIEQ: '%' + q + '%',
        },
        createDateGTE,
      },
      server,
    },
  });
  const dailyStats = data?.dailyPlayerStats?.items ?? [];
  const loading = loadingStats && dailyStats.length === 0;
  const total = data?.dailyPlayerStats?.total ?? 0;

  return {
    dailyStats,
    loading,
    total,
  };
};

export default usePlayers;
