import { useContext } from 'react';
import ctx from './context';
import { Server } from './types';

const useServer = (): Server => {
  return useContext(ctx);
};

export default useServer;
