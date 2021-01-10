import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/namespaces';
import Context from './context';

import { TRIBE } from './queries';
import { TribeQueryVariables } from '@libs/graphql/types';
import { Params, TribeQueryResult } from './types';

import NotFoundPage from '@features/ServerPage/features/NotFoundPage/NotFoundPage';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { key, id } = useParams<Params>();
  const { t } = useTranslation(SERVER_PAGE.TRIBE_PAGE.COMMON);
  const { loading: loadingServers, data } = useQuery<
    TribeQueryResult,
    TribeQueryVariables
  >(TRIBE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: parseInt(id, 10),
      server: key,
    },
  });
  const tribe = data?.tribe ? data.tribe : undefined;
  const loading = loadingServers && !tribe;

  if (loading) {
    const centerFlex = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <Spinner
        containerProps={{
          ...centerFlex,
          textAlign: 'center',
          minHeight: 'inherit',
          height: '100%',
          paddingY: 3,
        }}
        description={t('tribePageContextProvider.loadingTribe')}
      />
    );
  }

  if (!tribe) {
    return <NotFoundPage title={t('tribePageContextProvider.tribeNotFound')} />;
  }

  return <Context.Provider value={tribe}>{children}</Context.Provider>;
}

export default Provider;
