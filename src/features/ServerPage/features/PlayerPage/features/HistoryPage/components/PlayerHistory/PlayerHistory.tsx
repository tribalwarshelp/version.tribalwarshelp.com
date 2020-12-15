import React, { useMemo } from 'react';
import { subDays, isEqual as isEqualDate } from 'date-fns';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { SERVER_PAGE } from '@config/routes';
import { PLAYER_HISTORY_AND_DAILY_STATS } from './queries';
import { LIMIT } from './constants';

import { Paper, Tooltip } from '@material-ui/core';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import {
  PlayerHistory as PlayerHistoryT,
  PlayerHistoryItem,
  Variables,
} from './types';

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
    Variables
  >(PLAYER_HISTORY_AND_DAILY_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: query.limit,
      playerHistoryOffset: query.page * query.limit,
      dailyPlayerStatsOffset: query.page * query.limit + 1,
      sort: ['createDate DESC'],
      playerHistoryFilter: {
        playerID: [playerID],
      },
      dailyPlayerStatsFilter: {
        playerID: [playerID],
      },
      server,
    },
  });
  const playerHistoryItems = useMemo(() => {
    const dailyPlayerStatsItems = queryData?.dailyPlayerStats?.items ?? [];
    return (queryData?.playerHistory?.items ?? []).map(phItem => {
      const dateOfTheDayBeforeDate = subDays(new Date(phItem.createDate), 1);
      return {
        ...phItem,
        stats: dailyPlayerStatsItems.find(dpsItem =>
          isEqualDate(new Date(dpsItem.createDate), dateOfTheDayBeforeDate)
        ),
      };
    });
  }, [queryData]);
  const loading = playerHistoryItems.length === 0 && queryLoading;
  const total = queryData?.playerHistory?.total ?? 0;

  const formatColumn = (
    v: PlayerHistoryItem,
    valueKey:
      | 'points'
      | 'totalVillages'
      | 'scoreAtt'
      | 'scoreDef'
      | 'scoreSup'
      | 'scoreTotal',
    statsKey:
      | 'points'
      | 'villages'
      | 'scoreAtt'
      | 'scoreDef'
      | 'scoreSup'
      | 'scoreTotal',
    rankKey?: 'rank' | 'rankAtt' | 'rankDef' | 'rankSup' | 'rankTotal'
  ) => {
    return (
      <Tooltip
        arrow
        placement="right"
        title={
          v.stats && typeof v.stats[statsKey] === 'number'
            ? v.stats[statsKey].toLocaleString()
            : ''
        }
      >
        <span>
          {v[valueKey].toLocaleString()}
          {rankKey ? ` (#${v[rankKey]})` : ''}
        </span>
      </Tooltip>
    );
  };

  return (
    <Paper>
      <Table
        idFieldName="createDate"
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
            valueFormatter: (v: PlayerHistoryItem) => {
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
            valueFormatter: (v: PlayerHistoryItem) => {
              return formatColumn(v, 'points', 'points', 'rank');
            },
          },
          {
            field: 'totalVillages',
            label: t('playerHistory.columns.totalVillages'),
            sortable: false,
            valueFormatter: (v: PlayerHistoryItem) => {
              return formatColumn(v, 'totalVillages', 'villages');
            },
          },
          {
            field: 'scoreAtt',
            label: t('playerHistory.columns.scoreAtt'),
            sortable: false,
            valueFormatter: (v: PlayerHistoryItem) => {
              return formatColumn(v, 'scoreAtt', 'scoreAtt', 'rankAtt');
            },
          },
          {
            field: 'scoreDef',
            label: t('playerHistory.columns.scoreDef'),
            valueFormatter: (v: PlayerHistoryItem) => {
              return formatColumn(v, 'scoreDef', 'scoreDef', 'rankDef');
            },
            sortable: false,
          },
          {
            field: 'scoreSup',
            label: t('playerHistory.columns.scoreSup'),
            valueFormatter: (v: PlayerHistoryItem) => {
              return formatColumn(v, 'scoreSup', 'scoreSup', 'rankSup');
            },
            sortable: false,
          },
          {
            field: 'scoreTotal',
            label: t('playerHistory.columns.scoreTotal'),
            valueFormatter: (v: PlayerHistoryItem) => {
              return formatColumn(v, 'scoreTotal', 'scoreTotal', 'rankTotal');
            },
            sortable: false,
          },
        ]}
        loading={loading}
        data={playerHistoryItems}
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

export default PlayerHistory;
