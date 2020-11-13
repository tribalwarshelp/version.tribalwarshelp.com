import React from 'react';

import { TableRow, CircularProgress, Box, TableCell } from '@material-ui/core';

function TableLoading() {
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Box
          paddingY={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={200} />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default TableLoading;
