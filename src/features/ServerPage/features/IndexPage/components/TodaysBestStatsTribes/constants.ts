import { Column } from 'common/Table/types';
import { DailyTribeStatsRecord } from 'libs/graphql/types';

export const COLUMNS: Column<DailyTribeStatsRecord>[] = [
  {
    field: 'name',
    label: 'todaysBestStatsTribes.columns.name',
    sortable: false,
  },
  {
    field: 'score',
    label: 'todaysBestStatsTribes.columns.score',
    sortable: false,
  },
  {
    field: 'createDate',
    label: 'todaysBestStatsTribes.columns.createDate',
    sortable: false,
    type: 'dateutc',
  },
];

export const LIMIT = 5;
