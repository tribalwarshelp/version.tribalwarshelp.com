import { useQuery } from '@apollo/client';
import { ServersQueryVariables } from '@libs/graphql/types';
import { ServerList, Server } from './types';
import { SERVERS } from './queries';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';

export type QueryResult = {
  servers: Server[];
  loading: boolean;
  total: number;
};

const useServers = (page: number, perPage: number): QueryResult => {
  const { data, loading: loadingServers } = useQuery<
    ServerList,
    ServersQueryVariables
  >(SERVERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      sort: ['status DESC', 'key ASC'],
      offset: (page - 1) * perPage,
      limit: perPage,
      filter: {
        versionCode: [extractVersionCodeFromHostname(window.location.hostname)],
      },
    },
  });
  const servers = data?.servers?.items ?? [];
  const total = data?.servers?.total ?? 0;
  const loading = loadingServers && servers.length === 0;
  return {
    servers,
    total,
    loading,
  };
};

export default useServers;
