import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'rank',
    label: 'top5Tribes.columns.rank',
    sortable: false,
  },
  {
    field: 'tag',
    label: 'top5Tribes.columns.tag',
    sortable: false,
  },
  {
    field: 'points',
    label: 'top5Tribes.columns.points',
    sortable: false,
    valueFormatter: (tribe: Tribe) => formatNumber('commas', tribe.points),
  },
  {
    field: 'dominance',
    label: 'top5Tribes.columns.dominance',
    sortable: false,
    valueFormatter: (tribe: Tribe) =>
      formatNumber('dominance', tribe.dominance),
  },
];

export const LIMIT = 5;
