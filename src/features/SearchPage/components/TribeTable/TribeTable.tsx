import React from 'react';
import useTribes from './useTribes';
import * as ROUTES from 'config/routes';
import { COLUMNS } from './constants';

import Table from 'common/Table/Table';
import Link from 'common/Link/Link';
import { Props as TableFooterProps } from 'common/Table/TableFooter';

import { TFunction } from 'i18next';
import { Tribe } from './types';

export interface Props {
  t: TFunction;
  page: number;
  limit: number;
  q: string;
  onChangePage: TableFooterProps['onChangePage'];
  onChangeRowsPerPage: TableFooterProps['onChangeRowsPerPage'];
  version: string;
}

function TribeTable({
  t,
  q,
  limit,
  page,
  onChangePage,
  onChangeRowsPerPage,
  version,
}: Props) {
  const { tribes, total, loading } = useTribes(version, page, limit, q);

  return (
    <Table
      columns={COLUMNS.map((column, index) => ({
        ...column,
        valueFormatter:
          index === 1
            ? (tribe: Tribe) => (
                <Link
                  to={ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                  params={{ key: tribe.server, id: tribe.id }}
                >
                  {tribe.name} ({tribe.tag})
                </Link>
              )
            : column.valueFormatter,
        label: column.label ? t<string>(column.label) : '',
      }))}
      loading={loading}
      data={tribes}
      size="small"
      getRowKey={(row: Tribe) => row.server + row.id}
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

export default TribeTable;
