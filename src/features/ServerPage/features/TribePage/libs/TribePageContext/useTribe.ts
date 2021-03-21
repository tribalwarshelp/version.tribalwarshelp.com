import { useContext } from 'react';
import ctx from './context';

const useTribe = () => {
  return useContext(ctx);
};

export default useTribe;
