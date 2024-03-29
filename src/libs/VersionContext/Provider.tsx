import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
import extractVersionCodeFromHostname from 'utils/extractVersionCodeFromHostname';
import { VERSIONS } from './queries';
import Context from './context';
import * as NAMESPACES from 'config/namespaces';

import { QueryVersionsArgs, Query, VersionCode } from 'libs/graphql/types';

import NotFoundPage from 'features/NotFoundPage/NotFoundPage';
import Spinner from 'common/Spinner/Spinner';

export interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { t } = useTranslation(NAMESPACES.COMMON);

  const versionCode = useMemo(() => {
    return extractVersionCodeFromHostname(
      window.location.hostname
    ) as VersionCode;
  }, []);

  const { loading: loadingVersion, data } = useQuery<
    Pick<Query, 'versions'>,
    QueryVersionsArgs
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
      : null;
  const loading = loadingVersion && !version;

  useEffect(() => {
    if (!version) {
      return;
    }

    Sentry.setTag('version', version.code.toLowerCase());
  }, [version]);

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
