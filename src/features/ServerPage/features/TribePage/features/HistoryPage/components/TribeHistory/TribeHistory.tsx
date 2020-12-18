import React, { useMemo } from 'react';
import { subDays, isEqual as isEqualDate } from 'date-fns';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { validateRowsPerPage } from '@common/Table/helpers';
import formatNumber from '@utils/formatNumber';
import { TRIBE_HISTORY_AND_DAILY_STATS } from './queries';
import { LIMIT } from './constants';

import { Paper, Tooltip } from '@material-ui/core';
import Table from '@common/Table/Table';

import { TFunction } from 'i18next';
import {
  TribeHistory as TribeHistoryT,
  TribeHistoryItem,
  Variables,
} from './types';

export interface Props {
  server: string;
  tribeID: number;
  t: TFunction;
}

function TribeHistory({ t, server, tribeID }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
  const { data: queryData, loading: queryLoading } = useQuery<
    TribeHistoryT,
    Variables
  >(TRIBE_HISTORY_AND_DAILY_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      tribeHistoryOffset: query.page * limit,
      dailyTribeStatsOffset: query.page * limit + 1,
      sort: ['createDate DESC'],
      tribeHistoryFilter: {
        tribeID: [tribeID],
      },
      dailyTribeStatsFilter: {
        tribeID: [tribeID],
      },
      server,
    },
  });
  const tribeHistoryItems = useMemo(() => {
    const dailyTribeStatsItems = queryData?.dailyTribeStats?.items ?? [];
    return (queryData?.tribeHistory?.items ?? []).map(phItem => {
      const dateOfTheDayBeforeDate = subDays(new Date(phItem.createDate), 1);
      return {
        ...phItem,
        stats: dailyTribeStatsItems.find(dpsItem =>
          isEqualDate(new Date(dpsItem.createDate), dateOfTheDayBeforeDate)
        ),
      };
    });
  }, [queryData]);
  const loading = tribeHistoryItems.length === 0 && queryLoading;
  const total = queryData?.tribeHistory?.total ?? 0;

  const formatColumn = (
    v: TribeHistoryItem,
    valueKey:
      | 'points'
      | 'totalVillages'
      | 'scoreAtt'
      | 'scoreDef'
      | 'scoreTotal',
    statsKey: 'points' | 'villages' | 'scoreAtt' | 'scoreDef' | 'scoreTotal',
    rankKey?: 'rank' | 'rankAtt' | 'rankDef' | 'rankTotal'
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
            label: t('tribeHistory.columns.createDate'),
            sortable: false,
            type: 'date',
          },
          {
            field: 'points',
            label: t('tribeHistory.columns.points'),
            sortable: false,
            valueFormatter: (v: TribeHistoryItem) => {
              return formatColumn(v, 'points', 'points', 'rank');
            },
          },
          {
            field: 'totalVillages',
            label: t('tribeHistory.columns.totalVillages'),
            sortable: false,
            valueFormatter: (v: TribeHistoryItem) => {
              return formatColumn(v, 'totalVillages', 'villages');
            },
          },
          {
            field: 'dominance',
            label: t('tribeHistory.columns.dominance'),
            sortable: false,
            valueFormatter: (v: TribeHistoryItem) => {
              return formatNumber('dominance', v.dominance);
            },
          },
          {
            field: 'scoreAtt',
            label: t('tribeHistory.columns.scoreAtt'),
            sortable: false,
            valueFormatter: (v: TribeHistoryItem) => {
              return formatColumn(v, 'scoreAtt', 'scoreAtt', 'rankAtt');
            },
          },
          {
            field: 'scoreDef',
            label: t('tribeHistory.columns.scoreDef'),
            valueFormatter: (v: TribeHistoryItem) => {
              return formatColumn(v, 'scoreDef', 'scoreDef', 'rankDef');
            },
            sortable: false,
          },
          {
            field: 'scoreTotal',
            label: t('tribeHistory.columns.scoreTotal'),
            valueFormatter: (v: TribeHistoryItem) => {
              return formatColumn(v, 'scoreTotal', 'scoreTotal', 'rankTotal');
            },
            sortable: false,
          },
        ]}
        loading={loading}
        data={tribeHistoryItems}
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

export default TribeHistory;