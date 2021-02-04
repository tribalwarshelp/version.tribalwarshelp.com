import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'rank',
    label: 'ranking.columns.rank',
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
    sortable: false,
    valueFormatter: (tribe: Tribe) => formatNumber('commas', tribe.points),
  },
  {
    field: 'totalVillages',
    label: 'ranking.columns.totalVillages',
    sortable: false,
    valueFormatter: (tribe: Tribe) =>
      formatNumber('commas', tribe.totalVillages),
  },
  {
    field: 'dominance',
    label: 'ranking.columns.dominance',
    sortable: false,
    valueFormatter: (tribe: Tribe) =>
      formatNumber('dominance', tribe.dominance),
  },
];

export const LIMIT = 25;
