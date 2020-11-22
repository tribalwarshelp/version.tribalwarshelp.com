import React from 'react';
import { get, isString, isNumber } from 'lodash';
import { format } from 'date-fns';
import { Action, Column } from './types';

import { TableRow, TableCell, Checkbox, Tooltip } from '@material-ui/core';

export interface Props<T> {
  actions: Action[];
  columns: Column<T>[];
  row: T;
  selection: boolean;
  selected: boolean;
  size?: 'small' | 'medium';
  onSelect?: (row: T) => void;
}

function EnhancedTableRow<T extends object>({
  actions,
  columns,
  row,
  selection = false,
  selected = false,
  onSelect,
  size = 'medium',
}: Props<T>) {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(row);
    }
  };

  const formatValue = (
    v: string | number,
    type: 'datetime' | 'date' | 'normal'
  ) => {
    if ((isString(v) || isNumber(v)) && type === 'date') {
      return format(new Date(v), 'yyyy-MM-dd');
    }
    if ((isString(v) || isNumber(v)) && type === 'datetime') {
      return format(new Date(v), 'yyyy-MM-dd HH:mm:ss');
    }
    return v;
  };

  return (
    <TableRow>
      {selection && (
        <TableCell size={size} padding="checkbox">
          <Checkbox checked={selected} onClick={handleSelect} />
        </TableCell>
      )}
      {columns.map(col => {
        const val = get(row, col.field, '');
        return (
          <TableCell
            size={size}
            key={col.field}
            padding={col.disablePadding ? 'none' : 'default'}
            align={col.align ? col.align : 'left'}
          >
            {col.valueFormatter
              ? col.valueFormatter(row)
              : col.type
              ? formatValue(val, col.type)
              : val}
          </TableCell>
        );
      })}
      {actions.length > 0 && (
        <TableCell size={size}>
          {actions.map((action, index) =>
            action.tooltip ? (
              <Tooltip key={index} title={action.tooltip}>
                <div>{action.icon}</div>
              </Tooltip>
            ) : (
              <div key={index}>{action.icon}</div>
            )
          )}
        </TableCell>
      )}
    </TableRow>
  );
}

export default EnhancedTableRow;
