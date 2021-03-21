import { useContext } from 'react';
import ctx from './context';

const useServer = () => {
  return useContext(ctx);
};

export default useServer;
