import React from 'react';
import { useTranslation } from 'react-i18next';
import { TABLE } from 'config/namespaces';
import isObjKey from 'utils/isObjKey';
import { validateRowsPerPage } from './helpers';
import { Action, Column, OrderDirection } from './types';

import {
  Table as MUITable,
  TableBody,
  TableProps,
  TableBodyProps,
  TableContainer,
} from '@material-ui/core';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableLoading from './TableLoading';
import TableEmpty from './TableEmpty';
import TableFooter, { Props as TableFooterProps } from './TableFooter';

export interface Props<T> {
  columns: Column<T>[];
  actions?: Action<T>[];
  data: T[];
  orderBy?: string;
  orderDirection?: OrderDirection;
  selection?: boolean;
  idFieldName?: string;
  getIDFieldName?: (
    row: T,
    index: number
  ) => string | number | null | undefined;
  onRequestSort?: (
    orderBy: string,
    orderDirection: OrderDirection
  ) => void | Promise<void>;
  onSelect?: (checked: boolean, rows: T[]) => void;
  loading?: boolean;
  tableProps?: TableProps;
  tableBodyProps?: TableBodyProps;
  footerProps?: TableFooterProps;
  hideFooter?: boolean;
  size?: 'medium' | 'small';
  selected?: T[];
}

function Table<T extends object>({
  columns,
  data,
  orderBy = '',
  orderDirection = 'asc',
  onRequestSort,
  idFieldName = 'id',
  selection = false,
  loading = false,
  actions = [],
  tableBodyProps = {},
  tableProps = {},
  hideFooter = false,
  footerProps = {},
  size,
  selected,
  onSelect,
  getIDFieldName,
}: Props<T>) {
  const { t } = useTranslation(TABLE);
  const preparedFooterProps = {
    page: 0,
    rowsPerPage: validateRowsPerPage(
      footerProps?.rowsPerPage,
      footerProps?.rowsPerPageOptions
    ),
    count: data.length,
    size: size,
    ...footerProps,
  };

  const isSelected = (row: T): boolean => {
    return (
      Array.isArray(selected) &&
      selected.some(
        otherRow =>
          isObjKey(otherRow, idFieldName) &&
          isObjKey(row, idFieldName) &&
          otherRow[idFieldName] === row[idFieldName]
      )
    );
  };

  return (
    <TableContainer>
      <MUITable size={size} {...tableProps}>
        <TableHead
          t={t}
          columns={columns}
          hasActions={actions.length > 0}
          selection={selection}
          orderBy={orderBy}
          orderDirection={orderDirection}
          onRequestSort={onRequestSort}
          size={size}
          onSelectAll={checked => {
            if (onSelect) {
              onSelect(
                checked,
                data.filter(item =>
                  checked ? !isSelected(item) : isSelected(item)
                )
              );
            }
          }}
          allSelected={selected?.length === data.length && data.length > 0}
        />
        <TableBody {...tableBodyProps}>
          {loading ? (
            <TableLoading
              size={size}
              rowsPerPage={preparedFooterProps.rowsPerPage}
            />
          ) : data.length > 0 ? (
            data.map((item, index) => {
              return (
                <TableRow
                  key={
                    getIDFieldName
                      ? getIDFieldName(item, index)
                      : isObjKey(item, idFieldName)
                      ? item[idFieldName] + ''
                      : index
                  }
                  index={index}
                  row={item}
                  actions={actions}
                  selected={isSelected(item)}
                  selection={selection}
                  columns={columns}
                  size={size}
                  onSelect={(checked, row) => {
                    if (onSelect) {
                      onSelect(checked, [row]);
                    }
                  }}
                />
              );
            })
          ) : (
            <TableEmpty t={t} />
          )}
        </TableBody>
        {!hideFooter && (
          <TableFooter
            t={t}
            size={size}
            {...preparedFooterProps}
            count={
              loading
                ? preparedFooterProps.page *
                  (preparedFooterProps.rowsPerPage + 1)
                : preparedFooterProps.count
            }
          />
        )}
      </MUITable>
    </TableContainer>
  );
}

export default Table;
