import { useContext } from 'react';
import ctx from './context';

const usePlayer = () => {
  return useContext(ctx);
};

export default usePlayer;
