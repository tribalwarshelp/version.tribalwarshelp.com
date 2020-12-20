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
    label: 'ranking.columns.name',
    sortable: false,
  },
  {
    field: 'points',
    label: 'ranking.columns.points',
    sortable: false,
    valueFormatter: (player: Player) => player.points.toLocaleString(),
  },
  {
    field: 'totalVillages',
    label: 'ranking.columns.totalVillages',
    sortable: false,
    valueFormatter: (player: Player) => player.totalVillages.toLocaleString(),
  },
  {
    field: 'dailyGrowth',
    label: 'ranking.columns.dailyGrowth',
    sortable: false,
    valueFormatter: (player: Player) => player.dailyGrowth.toLocaleString(),
  },
];

export const LIMIT = 25;
