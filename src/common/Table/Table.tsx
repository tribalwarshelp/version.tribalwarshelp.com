import React from 'react';
import isObjKey from '@utils/isObjKey';
import { Action, Column, OrderDirection } from './types';

import {
  Table as MUITable,
  TableBody,
  TableProps,
  TableBodyProps,
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
}: Props<T>) {
  return (
    <MUITable {...tableProps}>
      <TableHead
        columns={columns}
        selection={selection}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onRequestSort={onRequestSort}
        allSelected={false}
      />
      <TableBody {...tableBodyProps}>
        {loading ? (
          <TableLoading />
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
              />
            );
          })
        ) : (
          <TableEmpty />
        )}
      </TableBody>
      {!hideFooter && (
        <TableFooter
          count={footerProps?.count ?? data.length}
          {...footerProps}
        />
      )}
    </MUITable>
  );
}

export default Table;
