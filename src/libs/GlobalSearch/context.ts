import { createContext } from 'react';
import { ContextValue } from './types';

const ctx = createContext<ContextValue>({
  href: '',
  q: '',
  setQ: (v: string) => {},
  goToSearchPage: () => {},
});

export default ctx;
