import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Player } from './types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'name',
    label: 'recentlyDeletedPlayers.columns.name',
    sortable: false,
  },
  {
    field: 'mostPoints',
    label: 'recentlyDeletedPlayers.columns.mostPoints',
    sortable: false,
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.mostPoints),
  },
  {
    field: 'deletedAt',
    label: 'recentlyDeletedPlayers.columns.deletedAt',
    sortable: false,
    type: 'datetime',
  },
];

export const LIMIT = 5;
