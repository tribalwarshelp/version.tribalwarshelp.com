import { useQuery } from '@apollo/client';
import { DAILY_TRIBE_STATS } from './queries';

import { DailyTribeStatsQueryVariables } from '@libs/graphql/types';
import { DailyTribeStatsRecord, DailyStats } from './types';

export type QueryResult = {
  dailyStats: DailyTribeStatsRecord[];
  loading: boolean;
  total: number;
};

const useTribes = (
  page: number,
  limit: number,
  server: string,
  q: string,
  sort: string,
  createDate: Date | string
): QueryResult => {
  const { loading: loadingStats, data } = useQuery<
    DailyStats,
    DailyTribeStatsQueryVariables
  >(DAILY_TRIBE_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: [sort],
      filter: {
        tribeFilter: {
          exists: true,
          tagIEQ: '%' + q + '%',
        },
        createDate,
      },
      server,
    },
  });
  const dailyStats = data?.dailyTribeStats?.items ?? [];
  const loading = loadingStats && dailyStats.length === 0;
  const total = data?.dailyTribeStats?.total ?? 0;

  return {
    dailyStats,
    loading,
    total,
  };
};

export default useTribes;
