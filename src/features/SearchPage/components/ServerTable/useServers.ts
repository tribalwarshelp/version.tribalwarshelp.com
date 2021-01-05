import { useQuery } from '@apollo/client';
import { SERVERS } from './queries';

import { ServersQueryVariables } from '@libs/graphql/types';
import { Server, ServerList } from './types';

export type QueryResult = {
  servers: Server[];
  loading: boolean;
  total: number;
};

const useServers = (page: number, limit: number, q: string): QueryResult => {
  const skip = q.trim() === '';
  const { loading: loadingServers, data } = useQuery<
    ServerList,
    ServersQueryVariables
  >(SERVERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: page * limit,
      sort: ['status DESC', 'key ASC'],
      filter: {
        keyIEQ: '%' + q + '%',
      },
    },
    skip,
  });
  const servers = data?.servers?.items ?? [];
  const loading = loadingServers && servers.length === 0 && !skip;
  const total = data?.servers?.total ?? 0;

  return {
    servers,
    loading,
    total,
  };
};

export default useServers;
