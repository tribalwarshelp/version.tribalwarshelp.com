import { decodeSort } from '@libs/serialize-query-params/SortParam';
import formatNumber from '@utils/formatNumber';
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
      formatNumber('commas', record.points),
  },
  {
    field: 'villages',
    label: 'ranking.columns.villages',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      formatNumber('commas', record.villages),
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      formatNumber('commas', record.scoreAtt),
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      formatNumber('commas', record.scoreDef),
  },
  {
    field: 'scoreSup',
    label: 'ranking.columns.scoreSup',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      formatNumber('commas', record.scoreSup),
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (record: DailyPlayerStatsRecord) =>
      formatNumber('commas', record.scoreTotal),
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('points DESC');
