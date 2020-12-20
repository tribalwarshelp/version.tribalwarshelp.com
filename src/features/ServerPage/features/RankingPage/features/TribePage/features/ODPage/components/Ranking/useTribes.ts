import { useQuery } from '@apollo/client';
import { TRIBES } from './queries';

import { TribesQueryVariables } from '@libs/graphql/types';
import { Tribe, TribeList } from './types';

export type QueryResult = {
  tribes: Tribe[];
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
  const { loading: loadingTribes, data } = useQuery<
    TribeList,
    TribesQueryVariables
  >(TRIBES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: [sort],
      filter: {
        exists: true,
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
