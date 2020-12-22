import React from 'react';
import { useQuery } from '@apollo/client';
import { LIVE_ENNOBLEMENTS } from './queries';

import Table from '../Table/Table';

import { TFunction } from 'i18next';
import { LiveEnnoblementsQueryVariables } from '@libs/graphql/types';
import { LiveEnnoblements as LiveEnnoblementsT } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function LiveEnnoblements({ t, server }: Props) {
  const { data: queryData, loading: queryLoading } = useQuery<
    LiveEnnoblementsT,
    LiveEnnoblementsQueryVariables
  >(LIVE_ENNOBLEMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      server,
    },
  });
  const ennoblements = [...(queryData?.liveEnnoblements ?? [])].reverse();
  const loading = ennoblements.length === 0 && queryLoading;

  return (
    <Table
      t={t}
      ennoblements={ennoblements}
      loading={loading}
      server={server}
      hideFooter
    />
  );
}

export default LiveEnnoblements;
