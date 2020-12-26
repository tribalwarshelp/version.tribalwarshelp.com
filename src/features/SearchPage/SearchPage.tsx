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

import { Container, Paper, Tabs, Tab } from '@material-ui/core';
import MainLayout from '@common/MainLayout/MainLayout';
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
  const currentTab = Object.values(MODES).findIndex(m => query.mode === m);

  const handleTabChange = (_e: React.ChangeEvent<{}>, newTab: number) => {
    const newMode = Object.values(MODES)[newTab];
    if (newMode !== query.mode) {
      setQuery({ mode: Object.values(MODES)[newTab], page: 0, limit: LIMIT });
    }
  };

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
          <Tabs centered value={currentTab} onChange={handleTabChange}>
            <Tab label={t('modes.player')} />
            <Tab label={t('modes.tribe')} />
          </Tabs>
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
