import { decodeSort } from '@libs/serialize-query-params/SortParam';
import { Column } from '@common/Table/types';
import { DailyTribeStatsRecord } from './types';

export const COLUMNS: Column<DailyTribeStatsRecord>[] = [
  {
    field: 'rank',
    label: '',
    sortable: false,
  },
  {
    field: 'tag',
    label: 'ranking.columns.tag',
    sortable: false,
  },
  {
    field: 'points',
    label: 'ranking.columns.points',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      record.points.toLocaleString(),
  },
  {
    field: 'villages',
    label: 'ranking.columns.villages',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      record.villages.toLocaleString(),
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      record.scoreAtt.toLocaleString(),
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      record.scoreDef.toLocaleString(),
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (record: DailyTribeStatsRecord) =>
      record.scoreTotal.toLocaleString(),
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('points DESC');
