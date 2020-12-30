import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Player } from './types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'rank',
    label: 'ranking.columns.rank',
    sortable: false,
  },
  {
    field: 'name',
    label: 'ranking.columns.player',
    sortable: false,
  },
  {
    field: 'points',
    label: 'ranking.columns.points',
    sortable: false,
    valueFormatter: (player: Player) => formatNumber('commas', player.points),
  },
  {
    field: 'totalVillages',
    label: 'ranking.columns.totalVillages',
    sortable: false,
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.totalVillages),
  },
  {
    field: 'dailyGrowth',
    label: 'ranking.columns.dailyGrowth',
    sortable: false,
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.dailyGrowth),
  },
];

export const LIMIT = 25;
