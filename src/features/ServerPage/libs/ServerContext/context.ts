import { createContext } from 'react';
import { SERVER_STATUS } from '@config/app';
import { Server } from './types';

const ctx = createContext<Server>({
  key: '',
  numberOfPlayers: 0,
  numberOfTribes: 0,
  numberOfVillages: 0,
  dataUpdatedAt: new Date(0),
  historyUpdatedAt: new Date(0),
  statsUpdatedAt: new Date(0),
  status: SERVER_STATUS.OPEN,
});

export default ctx;
