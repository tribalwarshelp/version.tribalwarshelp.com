import { useQuery } from '@apollo/client';
import { DAILY_PLAYER_STATS } from './queries';

import {
  QueryDailyPlayerStatsArgs,
  DailyPlayerStatsRecord,
  Query,
} from 'libs/graphql/types';

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
  sort: string,
  createDate: Date | string
): QueryResult => {
  const { loading: loadingStats, data } = useQuery<
    Pick<Query, 'dailyPlayerStats'>,
    QueryDailyPlayerStatsArgs
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
