import { Column } from 'common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'rank',
    label: 'odRankingTribes.columns.rank',
    sortable: false,
  },
  {
    field: 'name',
    label: 'odRankingTribes.columns.name',
    sortable: false,
  },
  {
    field: 'score',
    label: 'odRankingTribes.columns.score',
    sortable: false,
  },
];

export const LIMIT = 5;
