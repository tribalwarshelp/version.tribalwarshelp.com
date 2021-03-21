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
import { TFunction } from 'i18next';

export interface Props {
  columns: Column[];
  selection: boolean;
  onSelectAll?: (checked: boolean) => void;
  allSelected: boolean;
  orderDirection: OrderDirection;
  orderBy: string;
  size?: 'small' | 'medium';
  onRequestSort?: (
    property: string,
    orderDirection: OrderDirection
  ) => void | Promise<void>;
  hasActions: boolean;
  t: TFunction;
}

function TableHead({
  columns,
  onSelectAll,
  orderBy = '',
  orderDirection = 'asc',
  selection = false,
  allSelected = false,
  onRequestSort,
  size = 'medium',
  hasActions = false,
  t,
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
      onSelectAll(!allSelected);
    }
  };

  return (
    <MUITableHead>
      <TableRow>
        {selection && (
          <TableCell size={size} padding="checkbox">
            <Checkbox checked={allSelected} onClick={handleSelectAll} />
          </TableCell>
        )}
        {columns.map(col => {
          return (
            <TableCell
              size={size}
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
        {hasActions && <TableCell size={size}>{t('actions')}</TableCell>}
      </TableRow>
    </MUITableHead>
  );
}

export default TableHead;
