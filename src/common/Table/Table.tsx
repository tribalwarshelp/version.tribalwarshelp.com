import React from 'react';
import { useTranslation } from 'react-i18next';
import { TABLE } from '@config/namespaces';
import isObjKey from '@utils/isObjKey';
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
  columns: Column[];
  actions?: Action[];
  data: T[];
  orderBy?: string;
  orderDirection?: OrderDirection;
  selection?: boolean;
  idFieldName?: string;
  onRequestSort?: (
    property: string,
    orderDirection: OrderDirection
  ) => void | Promise<void>;
  onSelect?: (rows: T[]) => void;
  loading?: boolean;
  tableProps?: TableProps;
  tableBodyProps?: TableBodyProps;
  footerProps?: TableFooterProps;
  hideFooter?: boolean;
  size?: 'medium' | 'small';
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
  footerProps,
  size,
}: Props<T>) {
  const { t } = useTranslation(TABLE);
  return (
    <TableContainer>
      <MUITable size={size} {...tableProps}>
        <TableHead
          columns={columns}
          selection={selection}
          orderBy={orderBy}
          orderDirection={orderDirection}
          onRequestSort={onRequestSort}
          allSelected={false}
          size={size}
        />
        <TableBody {...tableBodyProps}>
          {loading ? (
            <TableLoading
              columns={columns}
              size={size}
              rowsPerPage={footerProps?.rowsPerPage ?? 50}
            />
          ) : data.length > 0 ? (
            data.map((item, index) => {
              return (
                <TableRow
                  key={
                    isObjKey(item, idFieldName) ? item[idFieldName] + '' : index
                  }
                  row={item}
                  actions={actions}
                  selected={false}
                  selection={selection}
                  columns={columns}
                  size={size}
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
            count={footerProps?.count ?? data.length}
            size={size}
            {...footerProps}
          />
        )}
      </MUITable>
    </TableContainer>
  );
}

export default Table;
