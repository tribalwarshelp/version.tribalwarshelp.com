import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { Player } from './types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'rank',
    label: '',
    sortable: false,
  },
  {
    field: 'name',
    label: 'ranking.columns.player',
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
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.mostPoints),
  },
  {
    field: 'mostVillages',
    label: 'ranking.columns.mostVillages',
    sortable: false,
    valueFormatter: (player: Player) =>
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
