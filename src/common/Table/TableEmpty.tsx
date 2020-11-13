import React from 'react';

import { TableRow, TableCell, Typography } from '@material-ui/core';

function TableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Typography align="center">No records to display</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableEmpty;
