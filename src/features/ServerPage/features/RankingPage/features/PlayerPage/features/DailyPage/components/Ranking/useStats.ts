import { useQuery } from '@apollo/client';
import { DAILY_PLAYER_STATS } from './queries';

import { DailyPlayerStatsQueryVariables } from '@libs/graphql/types';
import { DailyPlayerStatsRecord, DailyStats } from './types';

export type QueryResult = {
  dailyStats: DailyPlayerStatsRecord[];
  loading: boolean;
  total: number;
};

export type Options = {
  addTimezoneOffsetToCreateDate?: boolean;
};

const usePlayers = (
  page: number,
  limit: number,
  server: string,
  q: string,
  sort: string,
  createDate: Date
): QueryResult => {
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
        createDate,
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
