import { useContext } from 'react';
import ctx from './context';

const useVersion = () => {
  return useContext(ctx);
};

export default useVersion;
