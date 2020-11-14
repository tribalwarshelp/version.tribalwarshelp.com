import React from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/routes';
import { RECENTLY_DELETED_TRIBES } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Paper, Typography } from '@material-ui/core';
import Table from '@common/Table/Table';
import TableToolbar from '@common/Table/TableToolbar';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import { TribesQueryVariables } from '@libs/graphql/types';
import { TribeList, Tribe } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function RecentlyDeletedTribes({ server, t }: Props) {
  const { loading: loadingTribes, data } = useQuery<
    TribeList,
    TribesQueryVariables
  >(RECENTLY_DELETED_TRIBES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        limit: LIMIT,
        sort: 'deletedAt DESC',
        deletedAtGT: new Date(0),
      },
      server,
    },
  });
  const tribes = data?.tribes?.items ?? [];
  const loading = loadingTribes && tribes.length === 0;

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">{t('recentlyDeletedTribes.title')}</Typography>
      </TableToolbar>
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 0
              ? (tribe: Tribe) => (
                  <Link
                    to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                    params={{
                      key: server,
                      id: tribe.id,
                    }}
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
        hideFooter
        footerProps={{ rowsPerPage: LIMIT, rowsPerPageOptions: [LIMIT] }}
      />
    </Paper>
  );
}

export default RecentlyDeletedTribes;