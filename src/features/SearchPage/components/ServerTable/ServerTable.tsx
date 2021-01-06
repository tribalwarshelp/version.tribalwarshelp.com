import React from 'react';
import useServers from './useServers';
import * as NAMESPACES from '@config/namespaces';
import * as ROUTES from '@config/routes';
import { COLUMNS } from './constants';

import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import { Props as TableFooterProps } from '@common/Table/TableFooter';

import { TFunction } from 'i18next';
import { Server } from './types';

export interface Props {
  t: TFunction;
  page: number;
  limit: number;
  q: string;
  version: string;
  onChangePage: TableFooterProps['onChangePage'];
  onChangeRowsPerPage: TableFooterProps['onChangeRowsPerPage'];
}

function ServerTable({
  t,
  q,
  limit,
  page,
  onChangePage,
  onChangeRowsPerPage,
  version,
}: Props) {
  const { servers, total, loading } = useServers(version, page, limit, q);

  return (
    <Table
      columns={COLUMNS.map((column, index) => {
        const newCol = {
          ...column,
          label: column.label ? t<string>(column.label) : '',
        };
        switch (index) {
          case 0:
            newCol.valueFormatter = (server: Server) => (
              <span>
                {t(`${NAMESPACES.COMMON}:serverStatus.` + server.status)}
              </span>
            );
            break;
          case 1:
            newCol.valueFormatter = (server: Server) => (
              <Link
                to={ROUTES.SERVER_PAGE.INDEX_PAGE}
                params={{ key: server.key }}
              >
                {server.key}
              </Link>
            );
            break;
        }
        return newCol;
      })}
      loading={loading}
      data={servers}
      size="small"
      idFieldName="key"
      footerProps={{
        page,
        rowsPerPage: limit,
        count: total,
        onChangePage,
        onChangeRowsPerPage,
      }}
    />
  );
}

export default ServerTable;
