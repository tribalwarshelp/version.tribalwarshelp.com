import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  DateTimeParam,
} from 'use-query-params';
import useDateUtils from '@libs/date/useDateUtils';
import useScrollToElement from '@libs/useScrollToElement';
import { validateRowsPerPage } from '@common/Table/helpers';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';

import { makeStyles } from '@material-ui/core/styles';
import TableToolbar from '@common/Table/TableToolbar';
import DateTimePicker from '@common/Picker/DateTimePicker';
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
  const dateUtils = useDateUtils();
  const now = useRef(dateUtils.date());
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
    ennobledAtGTE: withDefault(DateTimeParam, dateUtils.date(0)),
    ennobledAtLTE: withDefault(DateTimeParam, now.current),
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
        ennobledAtGTE: dateUtils.zonedTimeToUTC(query.ennobledAtGTE),
        ennobledAtLTE: dateUtils.zonedTimeToUTC(query.ennobledAtLTE),
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
            value: query.ennobledAtGTE,
            maxDate: query.ennobledAtLTE,
          },
          {
            id: 'ennobledAtLTE',
            value: query.ennobledAtLTE,
            minDate: query.ennobledAtGTE,
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
                setQuery({ [id]: d ? d : undefined, page: 0 });
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
