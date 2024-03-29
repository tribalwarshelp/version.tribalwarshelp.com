import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import useScrollToElement from 'libs/useScrollToElement';
import { validateRowsPerPage } from 'common/Table/helpers';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from 'common/Table/Table';
import PlayerProfileLink from 'features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { QueryEnnoblementsArgs, Ennoblement, Query } from 'libs/graphql/types';

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
  useScrollToElement(document.documentElement, [query.page, limit]);
  const { data: queryData, loading: queryLoading } = useQuery<
    Pick<Query, 'ennoblements'>,
    QueryEnnoblementsArgs
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
              if (e.newOwner) {
                return (
                  <PlayerProfileLink
                    server={server}
                    player={e.newOwner}
                    tribe={e.newOwnerTribe}
                  />
                );
              }
              return '-';
            },
          },
        ]}
        loading={loading}
        data={ennoblements}
        size="small"
        footerProps={{
          page: query.page,
          rowsPerPage: limit,
          count: total,
          onChangePage: page => {
            setQuery({ page });
          },
          onChangeRowsPerPage: rowsPerPage => {
            setQuery({ limit: rowsPerPage, page: 0 });
          },
        }}
      />
    </Paper>
  );
}

export default Ennoblements;
