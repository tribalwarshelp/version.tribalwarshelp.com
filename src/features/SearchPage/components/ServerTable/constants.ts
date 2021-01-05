import formatNumber from '@utils/formatNumber';
import { Column } from '@common/Table/types';
import { Server } from './types';

export const COLUMNS: Column<Server>[] = [
  {
    field: 'status',
    label: 'serverTable.columns.status',
    sortable: false,
  },
  {
    field: 'key',
    label: 'serverTable.columns.key',
    sortable: false,
  },
  {
    field: 'numberOfPlayers',
    label: 'serverTable.columns.numberOfPlayers',
    sortable: false,
    valueFormatter: (server: Server) =>
      formatNumber('commas', server.numberOfPlayers),
  },
  {
    field: 'numberOfTribes',
    label: 'serverTable.columns.numberOfTribes',
    sortable: false,
    valueFormatter: (server: Server) =>
      formatNumber('commas', server.numberOfTribes),
  },
  {
    field: 'numberOfVillages',
    label: 'serverTable.columns.numberOfVillages',
    sortable: false,
    valueFormatter: (server: Server) =>
      formatNumber('commas', server.numberOfVillages),
  },
];

export const LIMIT = 25;
