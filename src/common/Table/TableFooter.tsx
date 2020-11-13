import React from 'react';
import { TFunction } from 'i18next';

import {
  TablePagination,
  TableRow,
  TableFooter as MUITableFooter,
} from '@material-ui/core';

export interface Props {
  page?: number;
  count?: number;
  onChangePage?: (page: number) => void;
  rowsPerPage?: number;
  onChangeRowsPerPage?: (limit: number) => void;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  size?: 'small' | 'medium';
}

function TableFooter({
  onChangePage,
  page = 0,
  count = 0,
  onChangeRowsPerPage,
  rowsPerPageOptions = [25, 50, 100],
  rowsPerPage = 50,
  size = 'small',
  t,
}: Props & { t: TFunction }) {
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    if (onChangePage) {
      onChangePage(page);
    }
  };
  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(parseInt(e.target.value));
    }
  };

  return (
    <MUITableFooter>
      <TableRow>
        <TablePagination
          count={count}
          page={page}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          size={size}
          colSpan={100}
          labelDisplayedRows={payload => t('labelDisplayedRows', payload)}
          labelRowsPerPage={t('labelRowsPerPage')}
          nextIconButtonText={t('next')}
          backIconButtonText={t('prev')}
        />
      </TableRow>
    </MUITableFooter>
  );
}

export default TableFooter;
