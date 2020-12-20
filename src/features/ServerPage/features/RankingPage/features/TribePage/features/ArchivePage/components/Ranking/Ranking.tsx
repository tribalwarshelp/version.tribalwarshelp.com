import React, { useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  StringParam,
} from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';
import useUpdateEffect from '@libs/useUpdateEffect';
import useTribes from './useTribes';
import { validateRowsPerPage } from '@common/Table/helpers';
import * as ROUTES from '@config/routes';
import { COLUMNS, LIMIT } from './constants';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import TableToolbar from '@common/Table/TableToolbar';
import SearchInput from '@common/Form/SearchInput';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import { Tribe } from './types';

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
    value => setQuery({ q: value }),
    1000
  );
  useUpdateEffect(() => {
    debouncedSetQuery.callback(q);
  }, [q]);
  const limit = validateRowsPerPage(query.limit);
  const { tribes, total, loading } = useTribes(
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
        columns={COLUMNS.map((column, index) => {
          const newCol = {
            ...column,
            label: column.label ? t<string>(column.label) : '',
          };
          if (index === 0) {
            newCol.valueFormatter = (_tribe: Tribe, index: number) => {
              return query.page * query.limit + (index + 1);
            };
          }
          if (index === 1) {
            newCol.valueFormatter = (tribe: Tribe) => (
              <Link
                to={ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                params={{ id: tribe.id, key: server }}
              >
                {tribe.tag}
              </Link>
            );
          }
          return newCol;
        })}
        loading={loading}
        data={tribes}
        size="small"
        footerProps={{
          page: loading ? 0 : query.page,
          rowsPerPage: limit,
          count: total,
          onChangePage: page => {
            if (window.scrollTo) {
              window.scrollTo({ top: 0, behavior: `smooth` });
            }
            setQuery({ page });
          },
          onChangeRowsPerPage: rowsPerPage => {
            if (window.scrollTo) {
              window.scrollTo({ top: 0, behavior: `smooth` });
            }
            requestAnimationFrame(() => {
              setQuery({ limit: rowsPerPage, page: 0 });
            });
          },
        }}
      />
    </Paper>
  );
}

export default Ranking;
