import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { Tribe } from 'libs/graphql/types';

export const COLUMNS: Column<Tribe>[] = [
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
    field: 'bestRank',
    label: 'ranking.columns.bestRank',
    sortable: false,
  },
  {
    field: 'mostPoints',
    label: 'ranking.columns.mostPoints',
    sortable: false,
    valueFormatter: (player: Tribe) =>
      formatNumber('commas', player.mostPoints),
  },
  {
    field: 'mostVillages',
    label: 'ranking.columns.mostVillages',
    sortable: false,
    valueFormatter: (player: Tribe) =>
      formatNumber('commas', player.mostVillages),
  },
  {
    field: 'deletedAt',
    label: 'ranking.columns.deletedAt',
    sortable: false,
    type: 'datetime',
  },
];

export const LIMIT = 25;
