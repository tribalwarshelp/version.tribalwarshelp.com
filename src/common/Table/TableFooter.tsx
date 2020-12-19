import React from 'react';

import {
  TablePagination,
  TableRow,
  TableFooter as MUITableFooter,
} from '@material-ui/core';

import { TFunction } from 'i18next';
export interface Props {
  page?: number;
  count?: number;
  onChangePage?: (page: number) => void;
  rowsPerPage?: number;
  onChangeRowsPerPage?: (limit: number) => void;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  size?: 'small' | 'medium';
}

export const ROWS_PER_PAGE_DEFAULT = 25;
export const ROWS_PER_PAGE_OPTIONS_DEFAULT = [25, 50, 100];

function TableFooter({
  onChangePage,
  page = 0,
  count = 0,
  onChangeRowsPerPage,
  rowsPerPageOptions = ROWS_PER_PAGE_OPTIONS_DEFAULT,
  rowsPerPage = ROWS_PER_PAGE_DEFAULT,
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
          backIconButtonText={t('previous')}
        />
      </TableRow>
    </MUITableFooter>
  );
}

export default TableFooter;
