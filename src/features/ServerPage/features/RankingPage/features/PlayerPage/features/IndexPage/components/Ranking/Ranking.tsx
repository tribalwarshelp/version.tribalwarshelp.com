import React, { useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  StringParam,
} from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';
import useUpdateEffect from 'libs/useUpdateEffect';
import useScrollToElement from 'libs/useScrollToElement';
import usePlayers from './usePlayers';
import { validateRowsPerPage } from 'common/Table/helpers';
import { COLUMNS, LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from 'common/Table/Table';
import TableToolbar from 'common/Table/TableToolbar';
import SearchInput from 'common/Form/SearchInput';
import PlayerProfileLink from 'features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { Player } from 'libs/graphql/types';

export interface Props {
  server: string;
  t: TFunction;
}

function Ranking({ server, t }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
    q: withDefault(StringParam, ''),
  });
  const [q, setQ] = useState(query.q);
  const debouncedSetQuery = useDebouncedCallback(
    value => setQuery({ q: value, page: 0 }),
    500,
    { maxWait: 1000 }
  );
  useUpdateEffect(() => {
    debouncedSetQuery.callback(q);
  }, [q]);
  const limit = validateRowsPerPage(query.limit);
  useScrollToElement(document.documentElement, [query.page, limit]);
  const { players, total, loading } = usePlayers(
    query.page,
    limit,
    server,
    query.q
  );

  return (
    <Paper>
      <TableToolbar style={{ justifyContent: 'flex-end' }}>
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
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 1
              ? (player: Player) => (
                  <PlayerProfileLink player={player} server={server} />
                )
              : column.valueFormatter,
          label: column.label ? t<string>(column.label) : '',
        }))}
        loading={loading}
        data={players}
        size="small"
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

export default Ranking;
