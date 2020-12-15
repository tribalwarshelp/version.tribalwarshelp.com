import { useContext } from 'react';
import ctx from './context';
import { Tribe } from './types';

const useTribe = (): Tribe => {
  return useContext(ctx);
};

export default useTribe;
