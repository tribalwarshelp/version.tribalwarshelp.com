import React from 'react';
import { useQueryParams, withDefault, StringParam } from 'use-query-params';

import MainLayout from '@common/MainLayout/MainLayout';

function SearchPage() {
  const [query] = useQueryParams({
    q: withDefault(StringParam, ''),
  });
  return (
    <MainLayout
      headerProps={{ hideVersionSelectorOnMobile: true, defaultQ: query.q }}
    >
      SearchPage
    </MainLayout>
  );
}

export default SearchPage;
