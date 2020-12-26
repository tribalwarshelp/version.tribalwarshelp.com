import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'server',
    label: 'tribeTable.columns.server',
    sortable: false,
  },
  {
    field: 'name',
    label: 'tribeTable.columns.name',
    sortable: false,
  },
  {
    field: 'bestRank',
    label: 'tribeTable.columns.bestRank',
    sortable: false,
    valueFormatter: (tribe: Tribe) => tribe.bestRank,
  },
  {
    field: 'mostPoints',
    label: 'tribeTable.columns.mostPoints',
    sortable: false,
    valueFormatter: (tribe: Tribe) => formatNumber('commas', tribe.mostPoints),
  },
  {
    field: 'mostVillages',
    label: 'tribeTable.columns.mostVillages',
    sortable: false,
    valueFormatter: (tribe: Tribe) =>
      formatNumber('commas', tribe.mostVillages),
  },
];

export const LIMIT = 25;
