import { Column } from 'common/Table/types';
import { DailyPlayerStatsRecord } from './types';

export const COLUMNS: Column<DailyPlayerStatsRecord>[] = [
  {
    field: 'name',
    label: 'todaysBestStatsPlayers.columns.name',
    sortable: false,
  },
  {
    field: 'score',
    label: 'todaysBestStatsPlayers.columns.score',
    sortable: false,
  },
  {
    field: 'createDate',
    label: 'todaysBestStatsPlayers.columns.createDate',
    sortable: false,
    type: 'dateutc',
  },
];

export const LIMIT = 5;
