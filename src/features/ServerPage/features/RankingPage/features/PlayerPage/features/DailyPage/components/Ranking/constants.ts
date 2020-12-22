import { decodeSort } from '@libs/serialize-query-params/SortParam';
import { Column } from '@common/Table/types';
import { DailyPlayerStatsRecord } from './types';

export const COLUMNS: Column<DailyPlayerStatsRecord>[] = [
  {
    field: 'rank',
    label: '',
    sortable: false,
  },
  {
    field: 'name',
    label: 'ranking.columns.name',
    sortable: false,
  },
  {
    field: 'points',
    label: 'ranking.columns.points',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      record.points.toLocaleString(),
  },
  {
    field: 'villages',
    label: 'ranking.columns.villages',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      record.villages.toLocaleString(),
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      record.scoreAtt.toLocaleString(),
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      record.scoreDef.toLocaleString(),
  },
  {
    field: 'scoreSup',
    label: 'ranking.columns.scoreSup',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      record.scoreSup.toLocaleString(),
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      record.scoreTotal.toLocaleString(),
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('points DESC');