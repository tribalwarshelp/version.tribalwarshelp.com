import React from 'react';
import {
  useQueryParams,
  withDefault,
  StringParam,
  NumberParam,
} from 'use-query-params';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useScrollToElement from '@libs/useScrollToElement';
import { validateRowsPerPage } from '@common/Table/helpers';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';
import { SEARCH_PAGE } from '@config/namespaces';
import { MODES, LIMIT } from './constants';

import { Container, Paper } from '@material-ui/core';
import MainLayout from '@common/MainLayout/MainLayout';
import ModeSelector from '@common/ModeSelector/ModeSelector';
import PlayerTable from './components/PlayerTable/PlayerTable';
import TribeTable from './components/TribeTable/TribeTable';

function SearchPage() {
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
    mode: withDefault(StringParam, MODES.PLAYER),
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
  const version = extractVersionCodeFromHostname(window.location.hostname);
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

  const tableProps = {
    t: t,
    q: query.q,
    limit: limit,
    page: query.page,
    version: version,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
  };

  return (
    <MainLayout
      headerProps={{ hideVersionSelectorOnMobile: true, defaultQ: query.q }}
    >
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
            ]}
          />
          {query.mode === MODES.TRIBE ? (
            <TribeTable {...tableProps} />
          ) : (
            <PlayerTable {...tableProps} />
          )}
        </Paper>
      </Container>
    </MainLayout>
  );
}

export default SearchPage;
