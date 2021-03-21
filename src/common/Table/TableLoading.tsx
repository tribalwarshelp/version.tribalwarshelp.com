import React, { Fragment } from 'react';

import { TableRow, TableCell } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export interface Props {
  rowsPerPage: number;
  size?: 'small' | 'medium';
}

function TableLoading({ rowsPerPage, size = 'medium' }: Props) {
  return (
    <Fragment>
      {new Array(rowsPerPage).fill(0).map((_, index) => {
        return (
          <TableRow key={index}>
            <TableCell size={size} colSpan={100}>
              <Skeleton variant="text" />
            </TableCell>
          </TableRow>
        );
      })}
    </Fragment>
  );
}

export default TableLoading;
