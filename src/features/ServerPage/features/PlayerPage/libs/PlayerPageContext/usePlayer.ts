import { useContext } from 'react';
import ctx from './context';
import { Player } from './types';

const usePlayer = (): Player => {
  return useContext(ctx);
};

export default usePlayer;
