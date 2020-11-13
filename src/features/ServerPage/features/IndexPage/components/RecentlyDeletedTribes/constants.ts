import { Column } from '@common/Table/types';

export const COLUMNS: Column[] = [
  {
    field: 'name',
    label: 'recentlyDeletedPlayers.columns.name',
    sortable: false,
  },
  {
    field: 'mostPoints',
    label: 'recentlyDeletedPlayers.columns.mostPoints',
    sortable: false,
    valueFormatter: (param: string | number | boolean) =>
      (param as number).toLocaleString(),
  },
  {
    field: 'deletedAt',
    label: 'recentlyDeletedPlayers.columns.deletedAt',
    sortable: false,
    type: 'datetime',
  },
];

export const LIMIT = 5;
