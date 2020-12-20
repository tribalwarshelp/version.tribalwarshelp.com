import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { validateRowsPerPage } from '@common/Table/helpers';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { EnnoblementsQueryVariables } from '@libs/graphql/types';
import { Ennoblements as EnnoblementsT, Ennoblement } from './types';

export interface Props {
  server: string;
  villageID: number;
  t: TFunction;
}

function Ennoblements({ t, server, villageID }: Props) {
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
      filter: {
        villageID: [villageID],
      },
      server,
    },
  });
  const ennoblements = queryData?.ennoblements?.items ?? [];
  const loading = ennoblements.length === 0 && queryLoading;
  const total = queryData?.ennoblements?.total ?? 0;

  return (
    <Paper>
      <Table
        columns={[
          {
            field: 'ennobledAt',
            label: t('ennoblements.columns.ennobledAt'),
            sortable: false,
            type: 'datetime',
          },
          {
            field: 'oldOwner',
            label: t('ennoblements.columns.oldOwner'),
            sortable: false,
            valueFormatter: (e: Ennoblement) => {
              if (e.oldOwner) {
                return (
                  <PlayerProfileLink
                    server={server}
                    player={e.oldOwner}
                    tribe={e.oldOwnerTribe}
                  />
                );
              }
              return '-';
            },
          },
          {
            field: 'newOwner',
            label: t('ennoblements.columns.newOwner'),
            sortable: false,
            valueFormatter: (e: Ennoblement) => {
              return (
                <PlayerProfileLink
                  server={server}
                  player={e.newOwner}
                  tribe={e.newOwnerTribe}
                />
              );
            },
          },
        ]}
        loading={loading}
        data={ennoblements}
        size="small"
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
    </Paper>
  );
}

export default Ennoblements;
