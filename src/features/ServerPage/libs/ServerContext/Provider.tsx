import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import useVersion from '@libs/VersionContext/useVersion';
import { SERVERS } from './queries';
import Context from './context';
import { SERVER_PAGE } from '@config/namespaces';

import { ServersQueryVariables } from '@libs/graphql/types';
import { Params, ServerList } from './types';

import NotFoundPage from '@features/NotFoundPage/NotFoundPage';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { key } = useParams<Params>();
  const { t } = useTranslation(SERVER_PAGE.COMMON);
  const version = useVersion();
  const { loading: loadingServers, data } = useQuery<
    ServerList,
    ServersQueryVariables
  >(SERVERS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 1,
      filter: {
        versionCode: [version.code],
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
        description={t('serverContextProvider.loading')}
      />
    );
  }

  if (!server) {
    return <NotFoundPage />;
  }

  return <Context.Provider value={server}>{children}</Context.Provider>;
}

export default Provider;
