import { useContext } from 'react';
import ctx from './context';
import { Version } from './types';

const useVersion = (): Version => {
  return useContext(ctx);
};

export default useVersion;
