import formatNumber from 'utils/formatNumber';
import { Column } from 'common/Table/types';
import { FoundTribe } from 'libs/graphql/types';

export const COLUMNS: Column<FoundTribe>[] = [
  {
    field: 'server',
    label: 'tribeTable.columns.server',
    sortable: false,
  },
  {
    field: 'name',
    label: 'tribeTable.columns.tribe',
    sortable: false,
  },
  {
    field: 'bestRank',
    label: 'tribeTable.columns.bestRank',
    sortable: false,
    valueFormatter: (tribe: FoundTribe) => tribe.bestRank,
  },
  {
    field: 'mostPoints',
    label: 'tribeTable.columns.mostPoints',
    sortable: false,
    valueFormatter: (tribe: FoundTribe) =>
      formatNumber('commas', tribe.mostPoints),
  },
  {
    field: 'mostVillages',
    label: 'tribeTable.columns.mostVillages',
    sortable: false,
    valueFormatter: (tribe: FoundTribe) =>
      formatNumber('commas', tribe.mostVillages),
  },
];

export const LIMIT = 25;
