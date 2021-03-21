import { useQuery } from '@apollo/client';
import { TRIBES } from './queries';

import { QueryTribesArgs, Tribe, Query } from 'libs/graphql/types';

export type QueryResult = {
  tribes: Tribe[];
  loading: boolean;
  total: number;
};

const useTribes = (
  page: number,
  limit: number,
  server: string,
  q: string
): QueryResult => {
  const { loading: loadingTribes, data } = useQuery<
    Pick<Query, 'tribes'>,
    QueryTribesArgs
  >(TRIBES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: ['mostPoints DESC'],
      filter: {
        exists: false,
        tagIEQ: '%' + q + '%',
      },
      server,
    },
  });
  const tribes = data?.tribes?.items ?? [];
  const loading = loadingTribes && tribes.length === 0;
  const total = data?.tribes?.total ?? 0;

  return {
    tribes,
    loading,
    total,
  };
};

export default useTribes;
