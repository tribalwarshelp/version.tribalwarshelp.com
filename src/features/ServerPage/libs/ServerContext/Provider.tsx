import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SERVERS } from './queries';
import Context from './context';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';
import { Params, ServerList } from './types';

import NotFoundPage from '@features/NotFoundPage/NotFoundPage';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { key } = useParams<Params>();
  const { loading: loadingServers, data } = useQuery<ServerList>(SERVERS, {
    fetchPolicy: 'cache-first',
    variables: {
      filter: {
        limit: 1,
        versionCode: [extractVersionCodeFromHostname(window.location.hostname)],
        key: [key],
      },
    },
  });
  const server =
    data?.servers?.items && data.servers.items.length > 0
      ? data.servers.items[0]
      : undefined;
  const loading = loadingServers && !server;

  if (loading) {
    return (
      <Spinner
        containerProps={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        description="Loading server..."
      />
    );
  }

  if (!server) {
    return <NotFoundPage />;
  }

  return <Context.Provider value={server}>{children}</Context.Provider>;
}

export default Provider;
