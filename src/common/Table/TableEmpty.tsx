import React from 'react';
import { TFunction } from 'i18next';

import { TableRow, TableCell, Typography } from '@material-ui/core';

export interface Props {
  t: TFunction;
}

function TableEmpty({ t }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Typography align="center">{t('emptyDataSourceMessage')}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableEmpty;
