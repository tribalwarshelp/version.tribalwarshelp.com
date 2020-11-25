import { createContext } from 'react';
import { Player } from './types';

const ctx = createContext<Player>({
  id: 0,
  name: '',
  exists: false,
});

export default ctx;
