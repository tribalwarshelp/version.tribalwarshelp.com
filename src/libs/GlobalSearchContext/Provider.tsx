import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SEARCH_PAGE } from '@config/routes';

import Context from './context';

export interface Props {
  children?: React.ReactNode;
}

function Provider({ children }: Props) {
  const [q, setQ] = useState<string>('');
  const history = useHistory();
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
