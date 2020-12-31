import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';
import { VERSIONS } from './queries';
import Context from './context';
import * as NAMESPACES from '@config/namespaces';

import { VersionsQueryVariables } from '@libs/graphql/types';
import { VersionList } from './types';

import NotFoundPage from '@features/NotFoundPage/NotFoundPage';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const versionCode = useMemo(() => {
    return extractVersionCodeFromHostname(window.location.hostname);
  }, []);
  const { loading: loadingVersion, data } = useQuery<
    VersionList,
    VersionsQueryVariables
  >(VERSIONS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 1,
      filter: {
        code: [versionCode],
      },
    },
  });
  const version =
    data?.versions?.items && data.versions.items.length > 0
      ? data.versions.items[0]
      : undefined;
  const loading = loadingVersion && !version;

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
        description={t('versionContextProvider.loading')}
      />
    );
  }

  if (!version) {
    return <NotFoundPage />;
  }

  return <Context.Provider value={version}>{children}</Context.Provider>;
}

export default Provider;
