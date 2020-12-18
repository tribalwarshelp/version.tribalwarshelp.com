import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { validateRowsPerPage } from '@common/Table/helpers';
import { SERVER_PAGE } from '@config/routes';
import { TRIBE_CHANGES } from './queries';
import { LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import { TribeChangesQueryVariables } from '@libs/graphql/types';
import { TribeChangesQuery, TribeChange } from './types';

export interface Props {
  server: string;
  tribeID: number;
  t: TFunction;
}

function TribeChanges({ t, server, tribeID }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
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
        or: {
          oldTribeID: [tribeID],
          newTribeID: [tribeID],
        },
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
            field: 'player',
            label: t('tribeChanges.columns.player'),
            sortable: false,
            valueFormatter: (v: TribeChange) => {
              return (
                <Link
                  to={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
                  params={{ id: v.player.id, key: server }}
                >
                  {v.player.name}
                </Link>
              );
            },
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
          page: loading ? 0 : query.page,
          rowsPerPage: query.limit,
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

export default TribeChanges;