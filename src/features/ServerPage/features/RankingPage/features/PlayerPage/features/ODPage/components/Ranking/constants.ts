import { decodeSort } from '@libs/serialize-query-params/SortParam';
import formatNumber from '@utils/formatNumber';
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
      `${formatNumber('commas', player.scoreAtt)} (#${player.rankAtt})`,
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${formatNumber('commas', player.scoreDef)} (#${player.rankDef})`,
  },
  {
    field: 'scoreSup',
    label: 'ranking.columns.scoreSup',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${formatNumber('commas', player.scoreSup)} (#${player.rankSup})`,
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (player: Player) =>
      `${formatNumber('commas', player.scoreTotal)} (#${player.rankTotal})`,
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('scoreTotal DESC');
