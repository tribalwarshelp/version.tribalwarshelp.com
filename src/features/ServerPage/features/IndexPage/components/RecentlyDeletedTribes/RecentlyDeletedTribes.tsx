import React from 'react';
import { useQuery } from '@apollo/client';
import { RECENTLY_DELETED_TRIBES } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { TFunction } from 'i18next';
import { TribesQueryVariables } from '@libs/graphql/types';
import { TribeList } from './types';

import { Paper, Toolbar, Typography } from '@material-ui/core';
import Table from '@common/Table/Table';

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

  console.log(tribes, loading);
  return (
    <Paper>
      <Toolbar>
        <Typography variant="h4">{t('recentlyDeletedTribes.title')}</Typography>
      </Toolbar>
      <Table
        columns={COLUMNS.map(column => ({
          ...column,
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
