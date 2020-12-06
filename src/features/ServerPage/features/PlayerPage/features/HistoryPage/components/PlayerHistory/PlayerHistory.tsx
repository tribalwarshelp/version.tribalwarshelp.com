import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { SERVER_PAGE } from '@config/routes';
import { PLAYER_HISTORY } from './queries';
import { LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import { PlayerHistoryQueryVariables } from '@libs/graphql/types';
import { PlayerHistory as PlayerHistoryT, Item } from './types';

export interface Props {
  server: string;
  playerID: number;
  t: TFunction;
}

function PlayerHistory({ t, server, playerID }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const { data: queryData, loading: queryLoading } = useQuery<
    PlayerHistoryT,
    PlayerHistoryQueryVariables
  >(PLAYER_HISTORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: query.limit,
      offset: query.page * query.limit,
      sort: ['createDate DESC'],
      filter: {
        playerID: [playerID],
      },
      server,
    },
  });
  const records = queryData?.playerHistory?.items ?? [];
  const loading = records.length === 0 && queryLoading;
  const total = queryData?.playerHistory?.total ?? 0;

  return (
    <Paper>
      <Table
        columns={[
          {
            field: 'createDate',
            label: t('playerHistory.columns.createDate'),
            sortable: false,
            type: 'date',
          },
          {
            field: 'tribe',
            label: t('playerHistory.columns.tribe'),
            sortable: false,
            valueFormatter: (v: Item) => {
              return v.tribe ? (
                <Link
                  to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                  params={{ id: v.tribe.id, key: server }}
                >
                  {v.tribe.tag}
                </Link>
              ) : (
                '-'
              );
            },
          },
          {
            field: 'points',
            label: t('playerHistory.columns.points'),
            sortable: false,
            valueFormatter: (v: Item) => {
              return `${v.points.toLocaleString()} (#${v.rank})`;
            },
          },
          {
            field: 'totalVillages',
            label: t('playerHistory.columns.totalVillages'),
            sortable: false,
            valueFormatter: (v: Item) => {
              return v.totalVillages.toLocaleString();
            },
          },
          {
            field: 'scoreAtt',
            label: t('playerHistory.columns.scoreAtt'),
            sortable: false,
            valueFormatter: (v: Item) => {
              return `${v.scoreAtt.toLocaleString()} (#${v.rankAtt})`;
            },
          },
          {
            field: 'scoreDef',
            label: t('playerHistory.columns.scoreDef'),
            valueFormatter: (v: Item) => {
              return `${v.scoreDef.toLocaleString()} (#${v.rankDef})`;
            },
            sortable: false,
          },
          {
            field: 'scoreSup',
            label: t('playerHistory.columns.scoreSup'),
            valueFormatter: (v: Item) => {
              return `${v.scoreSup.toLocaleString()} (#${v.rankSup})`;
            },
            sortable: false,
          },
          {
            field: 'scoreTotal',
            label: t('playerHistory.columns.scoreTotal'),
            valueFormatter: (v: Item) => {
              return `${v.scoreTotal.toLocaleString()} (#${v.rankTotal})`;
            },
            sortable: false,
          },
        ]}
        loading={loading}
        data={records}
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
            setQuery({ limit: rowsPerPage, page: 0 });
          },
        }}
      />
    </Paper>
  );
}

export default PlayerHistory;
