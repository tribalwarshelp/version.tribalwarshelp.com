import React from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from 'config/routes';
import { TOP_5_TRIBES } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import Table from 'common/Table/Table';
import TableToolbar from 'common/Table/TableToolbar';
import Link from 'common/Link/Link';
import Paper from '../Paper/Paper';

import { TFunction } from 'i18next';
import { QueryTribesArgs, Query, Tribe } from 'libs/graphql/types';

export interface Props {
  server: string;
  t: TFunction;
}

function Top5Tribes({ server, t }: Props) {
  const { loading: loadingTribes, data } = useQuery<
    Pick<Query, 'tribes'>,
    QueryTribesArgs
  >(TOP_5_TRIBES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: ['rank ASC'],
      filter: {
        exists: true,
      },
      server,
    },
  });
  const tribes = data?.tribes?.items ?? [];
  const loading = loadingTribes && tribes.length === 0;

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">
          <Link
            to={SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE}
            params={{ key: server }}
          >
            {t('top5Tribes.title')}
          </Link>
        </Typography>
      </TableToolbar>
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 1
              ? (tribe: Tribe) => (
                  <Link
                    to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                    params={{
                      key: server,
                      id: tribe.id,
                    }}
                  >
                    {tribe.tag}
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

export default Top5Tribes;
