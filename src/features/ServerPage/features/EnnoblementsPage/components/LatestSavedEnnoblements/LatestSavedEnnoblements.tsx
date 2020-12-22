import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { validateRowsPerPage } from '@common/Table/helpers';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';

import Table from '../Table/Table';

import { TFunction } from 'i18next';
import { EnnoblementsQueryVariables } from '@libs/graphql/types';
import { Ennoblements as EnnoblementsT } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function LatestSavedEnnoblements({ t, server }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
  const { data: queryData, loading: queryLoading } = useQuery<
    EnnoblementsT,
    EnnoblementsQueryVariables
  >(ENNOBLEMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: query.page * limit,
      sort: ['ennobledAt DESC'],
      server,
    },
  });
  const ennoblements = queryData?.ennoblements?.items ?? [];
  const loading = ennoblements.length === 0 && queryLoading;
  const total = queryData?.ennoblements?.total ?? 0;

  return (
    <Table
      t={t}
      ennoblements={ennoblements}
      loading={loading}
      server={server}
      footerProps={{
        page: loading ? 0 : query.page,
        rowsPerPage: limit,
        count: total,
        onChangePage: page => {
          if (window.scrollTo) {
            window.scrollTo({ top: 0, behavior: `smooth` });
          }
          setQuery({ page });
        },
        onChangeRowsPerPage: rowsPerPage => {
          if (window.scrollTo) {
            window.scrollTo({ top: 0, behavior: `smooth` });
          }
          requestAnimationFrame(() => {
            setQuery({ limit: rowsPerPage, page: 0 });
          });
        },
      }}
    />
  );
}

export default LatestSavedEnnoblements;
