import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Tribe } from './types';

export const COLUMNS: Column<Tribe>[] = [
  {
    field: 'name',
    label: 'recentlyDeletedTribes.columns.name',
    valueFormatter: (tribe: Tribe) => `${tribe.name} (${tribe.tag})`,
    sortable: false,
  },
  {
    field: 'mostPoints',
    label: 'recentlyDeletedTribes.columns.mostPoints',
    sortable: false,
    valueFormatter: (tribe: Tribe) => formatNumber('commas', tribe.mostPoints),
  },
  {
    field: 'deletedAt',
    label: 'recentlyDeletedTribes.columns.deletedAt',
    sortable: false,
    type: 'datetime',
  },
];

export const LIMIT = 5;
