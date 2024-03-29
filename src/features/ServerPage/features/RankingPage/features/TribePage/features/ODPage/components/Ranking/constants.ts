import { decodeSort } from 'libs/serialize-query-params/SortParam';
import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { Tribe } from 'libs/graphql/types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'tag',
    label: 'ranking.columns.tribe',
    sortable: false,
  },
  {
    field: 'scoreAtt',
    label: 'ranking.columns.scoreAtt',
    sortable: true,
    valueFormatter: (tribe: Tribe) =>
      `${formatNumber('commas', tribe.scoreAtt)} (#${tribe.rankAtt})`,
  },
  {
    field: 'scoreDef',
    label: 'ranking.columns.scoreDef',
    sortable: true,
    valueFormatter: (tribe: Tribe) =>
      `${formatNumber('commas', tribe.scoreDef)} (#${tribe.rankDef})`,
  },
  {
    field: 'scoreTotal',
    label: 'ranking.columns.scoreTotal',
    sortable: true,
    valueFormatter: (tribe: Tribe) =>
      `${formatNumber('commas', tribe.scoreTotal)} (#${tribe.rankTotal})`,
  },
];

export const LIMIT = 25;

export const DEFAULT_SORT = decodeSort('scoreTotal DESC');
