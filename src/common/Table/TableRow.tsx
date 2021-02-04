import React from 'react';
import { get, isString, isNumber } from 'lodash';
import useDateUtils from 'libs/date/useDateUtils';
import { DATE_FORMAT } from 'config/app';

import { TableRow, TableCell, Checkbox, Tooltip } from '@material-ui/core';

import { Action, Column } from './types';

export interface Props<T> {
  actions: Action<T>[];
  columns: Column<T>[];
  row: T;
  selection: boolean;
  selected: boolean;
  size?: 'small' | 'medium';
  index: number;
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
  index,
}: Props<T>) {
  const dateUtils = useDateUtils();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(row);
    }
  };

  const formatValue = (
    v: string | number | Date,
    type: 'datetime' | 'dateutc' | 'date' | 'normal'
  ) => {
    if ((isString(v) || isNumber(v) || v instanceof Date) && type === 'date') {
      return dateUtils.format(
        dateUtils.date(v),
        DATE_FORMAT.DAY_MONTH_AND_YEAR
      );
    }
    if (
      (isString(v) || isNumber(v) || v instanceof Date) &&
      type === 'dateutc'
    ) {
      return dateUtils.format(
        dateUtils.dateInTZ(v, 'UTC'),
        DATE_FORMAT.DAY_MONTH_AND_YEAR
      );
    }
    if (
      (isString(v) || isNumber(v) || v instanceof Date) &&
      type === 'datetime'
    ) {
      return dateUtils.format(
        dateUtils.date(v),
        DATE_FORMAT.HOUR_MINUTES_SECONDS_DAY_MONTH_AND_YEAR
      );
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
              ? col.valueFormatter(row, index)
              : col.type
              ? formatValue(val, col.type)
              : val}
          </TableCell>
        );
      })}
      {actions.length > 0 && (
        <TableCell size={size}>
          {actions.map((action, index) => {
            const icon =
              typeof action.icon === 'function'
                ? action.icon(row, index)
                : action.icon;
            return action.tooltip ? (
              <div key={index}>
                <Tooltip key={index} title={action.tooltip}>
                  <span>{icon}</span>
                </Tooltip>
              </div>
            ) : (
              <div key={index}>{icon}</div>
            );
          })}
        </TableCell>
      )}
    </TableRow>
  );
}

export default EnhancedTableRow;
