import { decodeSort } from '@libs/serialize-query-params/SortParam';
import { Column } from '@common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'tag',
    label: 'ranking.columns.tag',
    sortable: false,
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (tribe: Tribe) =>
      `${tribe.scoreAtt.toLocaleString()} (#${tribe.rankAtt})`,
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (tribe: Tribe) =>
      `${tribe.scoreDef.toLocaleString()} (#${tribe.rankDef})`,
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (tribe: Tribe) =>
      `${tribe.scoreTotal.toLocaleString()} (#${tribe.rankTotal})`,
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('scoreAtt DESC');
