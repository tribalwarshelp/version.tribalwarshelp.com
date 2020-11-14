import { Column } from '@common/Table/types';
import { DailyPlayerStatsRecord } from './types';

export const COLUMNS: Column<DailyPlayerStatsRecord>[] = [
  {
    field: 'name',
    label: 'dailyAchievementsPlayers.columns.name',
    sortable: false,
  },
  {
    field: 'score',
    label: 'dailyAchievementsPlayers.columns.score',
    sortable: false,
  },
  {
    field: 'createDate',
    label: 'dailyAchievementsPlayers.columns.createDate',
    sortable: false,
    type: 'date',
  },
];

export const LIMIT = 5;
