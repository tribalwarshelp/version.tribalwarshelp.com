import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { Player } from 'libs/graphql/types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'rank',
    label: 'top5Players.columns.rank',
    sortable: false,
  },
  {
    field: 'name',
    label: 'top5Players.columns.name',
    sortable: false,
  },
  {
    field: 'points',
    label: 'top5Players.columns.points',
    sortable: false,
    valueFormatter: (player: Player) => formatNumber('commas', player.points),
  },
  {
    field: 'dailyGrowth',
    label: 'top5Players.columns.dailyGrowth',
    sortable: false,
    valueFormatter: (player: Player) =>
      formatNumber('commas', player.dailyGrowth),
  },
];

export const LIMIT = 5;
