import React from 'react';
import {
  useQueryParams,
  withDefault,
  StringParam,
  NumberParam,
} from 'use-query-params';
import { useTranslation } from 'react-i18next';
import useVersion from 'libs/VersionContext/useVersion';
import useTitle from 'libs/useTitle';
import useScrollToElement from 'libs/useScrollToElement';
import { validateRowsPerPage } from 'common/Table/helpers';
import { SEARCH_PAGE } from 'config/namespaces';
import { LIMIT, Mode } from './constants';

import { Container, Paper } from '@material-ui/core';
import ModeSelector from 'common/ModeSelector/ModeSelector';
import PlayerTable from './components/PlayerTable/PlayerTable';
import TribeTable from './components/TribeTable/TribeTable';
import ServerTable from './components/ServerTable/ServerTable';

function SearchPage() {
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
    mode: withDefault(StringParam, Mode.Player),
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
  const version = useVersion();
  const { t } = useTranslation(SEARCH_PAGE);
  useTitle(t('title', { query: query.q }));
  useScrollToElement(
    document.documentElement,
    [query.q, query.mode, query.page, limit],
    { behavior: 'auto', block: 'start' }
  );

  const handlePageChange = (page: number) => {
    setQuery({ page });
  };

  const handleRowsPerPageChange = (rowsPerPage: number) => {
    setQuery({ limit: rowsPerPage, page: 0 });
  };

  const getTable = () => {
    const tableProps = {
      t: t,
      q: query.q,
      limit: limit,
      page: query.page,
      version: version.code,
      onChangePage: handlePageChange,
      onChangeRowsPerPage: handleRowsPerPageChange,
    };

    switch (query.mode.toLowerCase()) {
      case Mode.Tribe:
        return <TribeTable {...tableProps} />;
      case Mode.Server:
        return <ServerTable {...tableProps} />;
      default:
        return <PlayerTable {...tableProps} />;
    }
  };

  return (
    <Container>
      <Paper>
        <ModeSelector
          buttonProps={{ size: 'medium' }}
          onSelect={m => setQuery({ mode: m.name, page: 0, limit: LIMIT })}
          modes={[
            {
              name: 'player',
              label: t('modes.player'),
              get selected() {
                return this.name === query.mode;
              },
            },
            {
              name: 'tribe',
              label: t('modes.tribe'),
              get selected() {
                return this.name === query.mode;
              },
            },
            {
              name: 'server',
              label: t('modes.server'),
              get selected() {
                return this.name === query.mode;
              },
            },
          ]}
        />
        {getTable()}
      </Paper>
    </Container>
  );
}

export default SearchPage;
