import { Column } from '@common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
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
    field: 'bestRank',
    label: 'ranking.columns.bestRank',
    sortable: false,
  },
  {
    field: 'mostPoints',
    label: 'ranking.columns.mostPoints',
    sortable: false,
    valueFormatter: (player: Tribe) => player.mostPoints.toLocaleString(),
  },
  {
    field: 'mostVillages',
    label: 'ranking.columns.mostVillages',
    sortable: false,
    valueFormatter: (player: Tribe) => player.mostVillages.toLocaleString(),
  },
  {
    field: 'deletedAt',
    label: 'ranking.columns.deletedAt',
    sortable: false,
    type: 'datetime',
  },
];

export const LIMIT = 25;
