import { useContext } from 'react';
import ctx from './context';

const useDateUtils = () => {
  return useContext(ctx);
};

export default useDateUtils;
