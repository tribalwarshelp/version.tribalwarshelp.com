import { decodeSort } from 'libs/serialize-query-params/SortParam';
import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { DailyTribeStatsRecord } from 'libs/graphql/types';

export const COLUMNS: Column<DailyTribeStatsRecord>[] = [
  {
    field: 'rank',
    label: '',
    sortable: false,
  },
  {
    field: 'tag',
    label: 'ranking.columns.tribe',
    sortable: false,
  },
  {
    field: 'points',
    label: 'ranking.columns.points',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      formatNumber('commas', record.points),
  },
  {
    field: 'villages',
    label: 'ranking.columns.villages',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      formatNumber('commas', record.villages),
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      formatNumber('commas', record.scoreAtt),
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      formatNumber('commas', record.scoreDef),
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      formatNumber('commas', record.scoreTotal),
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('points DESC');
