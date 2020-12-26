import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Player } from './types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'server',
    label: 'playerTable.columns.server',
    sortable: false,
  },
  {
    field: 'name',
    label: 'playerTable.columns.name',
    sortable: false,
  },
  {
    field: 'bestRank',
    label: 'playerTable.columns.bestRank',
    sortable: false,
    valueFormatter: (player: Player) => player.bestRank,
  },
  {
    field: 'mostPoints',
    label: 'playerTable.columns.mostPoints',
    sortable: false,
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.mostPoints),
  },
  {
    field: 'mostVillages',
    label: 'playerTable.columns.mostVillages',
    sortable: false,
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.mostVillages),
  },
];

export const LIMIT = 25;
