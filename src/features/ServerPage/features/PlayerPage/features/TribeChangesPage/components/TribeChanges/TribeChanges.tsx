import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import useScrollToElement from 'libs/useScrollToElement';
import { validateRowsPerPage } from 'common/Table/helpers';
import { SERVER_PAGE } from 'config/routes';
import { TRIBE_CHANGES } from './queries';
import { LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from 'common/Table/Table';
import Link from 'common/Link/Link';

import { TFunction } from 'i18next';
import { TribeChangesQueryVariables } from 'libs/graphql/types';
import { TribeChangesQuery, TribeChange } from './types';

export interface Props {
  server: string;
  playerID: number;
  t: TFunction;
}

function TribeChanges({ t, server, playerID }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
  useScrollToElement(document.documentElement, [query.page, limit]);
  const { data: queryData, loading: queryLoading } = useQuery<
    TribeChangesQuery,
    TribeChangesQueryVariables
  >(TRIBE_CHANGES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: query.page * limit,
      sort: ['createdAt DESC'],
      filter: {
        playerID: [playerID],
      },
      server,
    },
  });
  const tribeChangesItems = queryData?.tribeChanges?.items ?? [];
  const loading = tribeChangesItems.length === 0 && queryLoading;
  const total = queryData?.tribeChanges?.total ?? 0;

  return (
    <Paper>
      <Table
        columns={[
          {
            field: 'createdAt',
            label: t('tribeChanges.columns.createdAt'),
            sortable: false,
            type: 'datetime',
          },
          {
            field: 'oldTribe',
            label: t('tribeChanges.columns.oldTribe'),
            sortable: false,
            valueFormatter: (v: TribeChange) => {
              return v.oldTribe ? (
                <Link
                  to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                  params={{ id: v.oldTribe.id, key: server }}
                >
                  {v.oldTribe.tag}
                </Link>
              ) : (
                '-'
              );
            },
          },
          {
            field: 'newTribe',
            label: t('tribeChanges.columns.newTribe'),
            sortable: false,
            valueFormatter: (v: TribeChange) => {
              return v.newTribe ? (
                <Link
                  to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                  params={{ id: v.newTribe.id, key: server }}
                >
                  {v.newTribe.tag}
                </Link>
              ) : (
                '-'
              );
            },
          },
        ]}
        loading={loading}
        data={tribeChangesItems}
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

export default TribeChanges;
