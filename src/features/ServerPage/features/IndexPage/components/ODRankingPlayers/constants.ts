import { Column } from 'common/Table/types';
import { Player } from './types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'rank',
    label: 'odRankingPlayers.columns.rank',
    sortable: false,
  },
  {
    field: 'name',
    label: 'odRankingPlayers.columns.name',
    sortable: false,
  },
  {
    field: 'score',
    label: 'odRankingPlayers.columns.score',
    sortable: false,
  },
];

export const LIMIT = 5;
