import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
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
  sort: string
): QueryResult => {
  const { historyUpdatedAt } = useServer();
  const createDateGTE = useMemo<string>(() => {
    return historyUpdatedAt.toString().split('T')[0] + 'T00:00:00Z';
  }, [historyUpdatedAt]);
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
        createDateGTE,
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
