import { useQuery } from '@apollo/client';
import { DAILY_TRIBE_STATS } from './queries';

import {
  QueryDailyTribeStatsArgs,
  DailyTribeStatsRecord,
  Query,
} from 'libs/graphql/types';

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
    Pick<Query, 'dailyTribeStats'>,
    QueryDailyTribeStatsArgs
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
