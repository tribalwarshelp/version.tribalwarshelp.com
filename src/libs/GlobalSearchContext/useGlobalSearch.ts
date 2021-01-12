import { useContext } from 'react';
import ctx from './context';
import { ContextValue } from './types';

const useGlobalSearch = (): ContextValue => {
  return useContext(ctx);
};

export default useGlobalSearch;
