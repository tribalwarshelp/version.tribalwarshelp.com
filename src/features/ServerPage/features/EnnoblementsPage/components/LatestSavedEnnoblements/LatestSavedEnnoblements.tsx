import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  DateParam,
} from 'use-query-params';
import useScrollToElement from '@libs/useScrollToElement';
import { validateRowsPerPage } from '@common/Table/helpers';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';

import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '../Table/Table';

import { TFunction } from 'i18next';
import { EnnoblementsQueryVariables } from '@libs/graphql/types';
import { Ennoblements as EnnoblementsT } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function LatestSavedEnnoblements({ t, server }: Props) {
  const classes = useStyles();
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
    ennobledAtGTE: withDefault(DateParam, undefined),
    ennobledAtLTE: withDefault(DateParam, undefined),
  });
  const limit = validateRowsPerPage(query.limit);
  useScrollToElement(document.documentElement, [query.page, limit]);
  const { data: queryData, loading: queryLoading } = useQuery<
    EnnoblementsT,
    EnnoblementsQueryVariables
  >(ENNOBLEMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: query.page * limit,
      sort: ['ennobledAt DESC'],
      filter: {
        ennobledAtGTE: query.ennobledAtGTE,
        ennobledAtLTE: query.ennobledAtLTE,
      },
      server,
    },
  });
  const ennoblements = queryData?.ennoblements?.items ?? [];
  const loading = ennoblements.length === 0 && queryLoading;
  const total = queryData?.ennoblements?.total ?? 0;

  return (
    <div>
      <TableToolbar className={classes.tableToolbar}>
        {[
          { id: 'ennobledAtGTE', defaultValue: query.ennobledAtGTE },
          { id: 'ennobledAtLTE', defaultValue: query.ennobledAtLTE },
        ].map(({ id, defaultValue }) => {
          return (
            <TextField
              type="date"
              key={id}
              label={t('latestSavedEnnoblements.inputs.' + id)}
              defaultValue={
                defaultValue && defaultValue instanceof Date
                  ? format(defaultValue, 'yyyy-MM-dd')
                  : undefined
              }
              onChange={e => {
                setQuery({ [id]: new Date(e.target.value) });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          );
        })}
      </TableToolbar>
      <Table
        t={t}
        ennoblements={ennoblements}
        loading={loading}
        footerProps={{
          page: query.page,
          rowsPerPage: limit,
          count: total,
          onChangePage: page => {
            setQuery({ page });
          },
          onChangeRowsPerPage: rowsPerPage => {
            setQuery({ limit: rowsPerPage, page: 0 });
          },
        }}
      />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  tableToolbar: {
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));

export default LatestSavedEnnoblements;
