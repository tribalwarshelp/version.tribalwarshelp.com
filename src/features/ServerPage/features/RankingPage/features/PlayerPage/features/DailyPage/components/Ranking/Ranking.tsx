import React, { useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  StringParam,
  DateTimeParam,
} from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';
import useUpdateEffect from '@libs/useUpdateEffect';
import useScrollToElement from '@libs/useScrollToElement';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import SortParam from '@libs/serialize-query-params/SortParam';
import useStats from './useStats';
import { validateRowsPerPage } from '@common/Table/helpers';
import { COLUMNS, LIMIT, DEFAULT_SORT } from './constants';

import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import TableToolbar from '@common/Table/TableToolbar';
import SearchInput from '@common/Form/SearchInput';
import DatePicker from '@common/Picker/DatePicker';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { DailyPlayerStatsRecord } from './types';

export interface Props {
  t: TFunction;
}

function Ranking({ t }: Props) {
  const classes = useStyles();
  const server = useServer();
  const defaultDate = new Date(server.historyUpdatedAt);
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
    q: withDefault(StringParam, ''),
    sort: withDefault(SortParam, DEFAULT_SORT),
    createDate: withDefault(DateTimeParam, defaultDate),
  });
  const limit = validateRowsPerPage(query.limit);
  const [q, setQ] = useState(query.q);
  const debouncedSetQuery = useDebouncedCallback(
    value => setQuery({ q: value, page: 0 }),
    500,
    { maxWait: 1000 }
  );
  useUpdateEffect(() => {
    debouncedSetQuery.callback(q);
  }, [q]);
  useScrollToElement(document.documentElement, [query.page, limit]);
  const { dailyStats, total, loading } = useStats(
    query.page,
    limit,
    server.key,
    query.q,
    query.sort.toString(),
    query.createDate
  );

  return (
    <Paper>
      <TableToolbar className={classes.tableToolbar}>
        <DatePicker
          size="small"
          label={t('ranking.createDateInputLabel')}
          value={query.createDate}
          disableFuture
          variant="dialog"
          onChange={d => {
            setQuery({ createDate: d ? d : undefined, page: 0 });
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SearchInput
          variant="outlined"
          size="small"
          placeholder={t<string>('ranking.searchInputPlaceholder')}
          value={q}
          onChange={e => {
            setQ(e.target.value);
          }}
          onResetValue={() => setQ('')}
        />
      </TableToolbar>
      <Table
        columns={COLUMNS.map((column, index) => {
          const newCol = {
            ...column,
            label: column.label ? t<string>(column.label) : '',
          };
          if (index === 0) {
            newCol.valueFormatter = (
              _record: DailyPlayerStatsRecord,
              index: number
            ) => {
              return query.page * query.limit + (index + 1);
            };
          }
          if (index === 1) {
            newCol.valueFormatter = (record: DailyPlayerStatsRecord) => (
              <PlayerProfileLink player={record.player} server={server.key} />
            );
          }
          return newCol;
        })}
        loading={loading}
        data={dailyStats}
        getRowKey={(record: DailyPlayerStatsRecord) => record.player.id}
        size="small"
        orderBy={query.sort.orderBy}
        orderDirection={query.sort.orderDirection}
        onRequestSort={(orderBy, orderDirection) => {
          setQuery({
            sort: SortParam.decode(orderBy + ' ' + orderDirection),
            page: 0,
          });
        }}
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
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  tableToolbar: {
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      [theme.breakpoints.down(700)]: {
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
      },
    },
    [theme.breakpoints.down(700)]: {
      flexDirection: 'column',
    },
  },
}));

export default Ranking;
