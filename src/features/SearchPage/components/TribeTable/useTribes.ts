import { useQuery } from '@apollo/client';
import { SEARCH_TRIBE } from './queries';

import { QuerySearchTribeArgs, FoundTribe } from 'libs/graphql/types';
import { TribeList } from './types';

export type QueryResult = {
  tribes: FoundTribe[];
  loading: boolean;
  total: number;
};

const useTribes = (
  version: string,
  page: number,
  limit: number,
  q: string
): QueryResult => {
  const skip = q.trim() === '';
  const { loading: loadingTribes, data } = useQuery<
    TribeList,
    QuerySearchTribeArgs
  >(SEARCH_TRIBE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: ['server ASC', 'mostPoints DESC'],
      version,
      query: '%' + q + '%',
    },
    skip,
  });
  const tribes = data?.foundTribes?.items ?? [];
  const loading = loadingTribes && tribes.length === 0 && !skip;
  const total = data?.foundTribes?.total ?? 0;

  return {
    tribes,
    loading,
    total,
  };
};

export default useTribes;
