import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParam, StringParam, withDefault } from 'use-query-params';
import { SEARCH_PAGE } from 'config/routes';

import Context from './context';

export interface Props {
  children?: React.ReactNode;
}

function Provider({ children, ...rest }: Props) {
  const [defaultQ] = useQueryParam('q', withDefault(StringParam, ''));
  const history = useHistory();
  const location = useLocation();
  const [q, setQ] = useState<string>(
    location.pathname === SEARCH_PAGE ? defaultQ : ''
  );
  const href = SEARCH_PAGE + `?q=${encodeURIComponent(q)}`;

  const goToSearchPage = () => {
    history.push(href);
  };

  return (
    <Context.Provider value={{ q, setQ, href, goToSearchPage }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
