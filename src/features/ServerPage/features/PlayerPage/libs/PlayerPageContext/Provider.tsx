import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/namespaces';
import Context from './context';

import { PLAYER } from './queries';
import { PlayerQueryVariables } from '@libs/graphql/types';
import { Params, PlayerQueryResult } from './types';

import NotFoundPage from '@features/ServerPage/features/NotFoundPage/NotFoundPage';
import PageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { key, id } = useParams<Params>();
  const { t } = useTranslation(SERVER_PAGE.PLAYER_PAGE.COMMON);
  const { loading: loadingServers, data } = useQuery<
    PlayerQueryResult,
    PlayerQueryVariables
  >(PLAYER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: parseInt(id, 10),
      server: key,
    },
  });
  const player = data?.player ? data.player : undefined;
  const loading = loadingServers && !player;

  if (loading) {
    return (
      <PageLayout>
        <Spinner
          containerProps={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          description={t('playerPageContextProvider.loadingPlayer')}
        />
      </PageLayout>
    );
  }

  if (!player) {
    return (
      <NotFoundPage title={t('playerPageContextProvider.playerNotFound')} />
    );
  }

  return <Context.Provider value={player}>{children}</Context.Provider>;
}

export default Provider;
