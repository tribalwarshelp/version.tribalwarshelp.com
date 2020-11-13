import React from 'react';
import { Column, OrderDirection } from './types';

import {
  TableHead as MUITableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  SortDirection,
} from '@material-ui/core';

export interface Props {
  columns: Column[];
  selection: boolean;
  onSelectAll?: () => void;
  allSelected: boolean;
  orderDirection: OrderDirection;
  orderBy: string;
  onRequestSort?: (
    property: string,
    orderDirection: OrderDirection
  ) => void | Promise<void>;
}

function TableHead({
  columns,
  onSelectAll,
  orderBy = '',
  orderDirection = 'asc',
  selection = false,
  allSelected = false,
  onRequestSort,
}: Props) {
  const createSortHandler = (property: string) => () => {
    if (onRequestSort) {
      if (property === orderBy) {
        onRequestSort(property, orderDirection === 'asc' ? 'desc' : 'asc');
      } else {
        onRequestSort(property, 'asc');
      }
    }
  };

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll();
    }
  };

  return (
    <MUITableHead>
      <TableRow>
        {selection && (
          <TableCell padding="checkbox">
            <Checkbox checked={allSelected} onClick={handleSelectAll} />
          </TableCell>
        )}
        {columns.map(col => {
          return (
            <TableCell
              key={col.field}
              padding={col.disablePadding ? 'none' : 'default'}
              align={col.align ? col.align : 'left'}
              sortDirection={
                (orderBy === col.field
                  ? orderDirection
                  : false) as SortDirection
              }
            >
              {col.sortable ? (
                <TableSortLabel
                  active={orderBy === col.field}
                  onClick={createSortHandler(col.field)}
                  direction={orderBy === col.field ? orderDirection : 'asc'}
                >
                  {col.label ?? col.field}
                </TableSortLabel>
              ) : (
                col.label ?? col.field
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </MUITableHead>
  );
}

export default TableHead;
