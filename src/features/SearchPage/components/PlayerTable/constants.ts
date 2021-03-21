import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { FoundPlayer } from 'libs/graphql/types';

export const COLUMNS: Column<FoundPlayer>[] = [
  {
    field: 'server',
    label: 'playerTable.columns.server',
    sortable: false,
  },
  {
    field: 'name',
    label: 'playerTable.columns.player',
    sortable: false,
  },
  {
    field: 'bestRank',
    label: 'playerTable.columns.bestRank',
    sortable: false,
    valueFormatter: (player: FoundPlayer) => player.bestRank,
  },
  {
    field: 'mostPoints',
    label: 'playerTable.columns.mostPoints',
    sortable: false,
    valueFormatter: (player: FoundPlayer) =>
      formatNumber('commas', player.mostPoints),
  },
  {
    field: 'mostVillages',
    label: 'playerTable.columns.mostVillages',
    sortable: false,
    valueFormatter: (player: FoundPlayer) =>
      formatNumber('commas', player.mostVillages),
  },
];

export const LIMIT = 25;
