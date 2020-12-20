import { decodeSort } from '@libs/serialize-query-params/SortParam';
import { Column } from '@common/Table/types';
import { Player } from './types';

export const COLUMNS: Column<Player>[] = [
  {
    field: 'name',
    label: 'ranking.columns.name',
    sortable: false,
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${player.scoreAtt.toLocaleString()} (#${player.rankAtt})`,
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${player.scoreDef.toLocaleString()} (#${player.rankDef})`,
  },
  {
    field: 'scoreSup',
    label: 'ranking.columns.scoreSup',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${player.scoreSup.toLocaleString()} (#${player.rankSup})`,
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${player.scoreTotal.toLocaleString()} (#${player.rankTotal})`,
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('scoreAtt DESC');
