import React, { Fragment } from 'react';
import { Column } from './types';

import { TableRow, TableCell } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export interface Props {
  rowsPerPage: number;
  columns: Column[];
  size?: 'small' | 'medium';
}

function TableLoading({ rowsPerPage, columns, size = 'medium' }: Props) {
  return (
    <Fragment>
      {new Array(rowsPerPage).fill(0).map((_, index) => {
        return (
          <TableRow key={index}>
            {columns.map(col => (
              <TableCell size={size} key={col.field}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </Fragment>
  );
}

export default TableLoading;
