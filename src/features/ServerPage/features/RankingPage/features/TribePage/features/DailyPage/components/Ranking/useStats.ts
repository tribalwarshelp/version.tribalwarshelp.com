import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { DAILY_TRIBE_STATS } from './queries';

import { DailyTribeStatsQueryVariables } from '@libs/graphql/types';
import { DailyTribeStatsRecord, TodaysStats } from './types';

export type QueryResult = {
  todaysStats: DailyTribeStatsRecord[];
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
    TodaysStats,
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
  const todaysStats = data?.dailyTribeStats?.items ?? [];
  const loading = loadingStats && todaysStats.length === 0;
  const total = data?.dailyTribeStats?.total ?? 0;

  return {
    todaysStats,
    loading,
    total,
  };
};

export default useTribes;
