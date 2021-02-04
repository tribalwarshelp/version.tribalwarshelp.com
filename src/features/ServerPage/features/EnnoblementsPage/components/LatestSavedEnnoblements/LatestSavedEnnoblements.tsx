import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import useDateUtils from 'libs/date/useDateUtils';
import useScrollToElement from 'libs/useScrollToElement';
import DateTimeParam from 'libs/serialize-query-params/DateTimeParam';
import { validateRowsPerPage } from 'common/Table/helpers';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';

import { makeStyles } from '@material-ui/core/styles';
import TableToolbar from 'common/Table/TableToolbar';
import DateTimePicker from 'common/Picker/DateTimePicker';
import Table from '../Table/Table';

import { TFunction } from 'i18next';
import { EnnoblementsQueryVariables } from 'libs/graphql/types';
import { Ennoblements as EnnoblementsT } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function LatestSavedEnnoblements({ t, server }: Props) {
  const classes = useStyles();
  const dateUtils = useDateUtils();
  const dateTimeParam = new DateTimeParam({ dateUtils });
  const now = useRef(dateTimeParam.newDecodedDate(new Date().getTime()));
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
    ennobledAtGTE: withDefault(dateTimeParam, dateTimeParam.newDecodedDate(0)),
    ennobledAtLTE: withDefault(dateTimeParam, now.current),
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
        ennobledAtGTE: query.ennobledAtGTE.server,
        ennobledAtLTE: query.ennobledAtLTE.server,
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
          {
            id: 'ennobledAtGTE',
            value: query.ennobledAtGTE.display,
            maxDate: query.ennobledAtLTE.display,
          },
          {
            id: 'ennobledAtLTE',
            value: query.ennobledAtLTE.display,
            minDate: query.ennobledAtGTE.display,
          },
        ].map(({ id, value, maxDate, minDate }) => {
          return (
            <DateTimePicker
              size="small"
              key={id}
              label={t('latestSavedEnnoblements.inputs.' + id)}
              value={value}
              disableFuture
              variant="dialog"
              maxDate={maxDate}
              minDate={minDate}
              showTodayButton
              onChange={d => {
                setQuery({
                  [id]: d ? d : undefined,
                  page: 0,
                });
              }}
              InputLabelProps={{
                shrink: true,
              }}
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
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));

export default LatestSavedEnnoblements;
