import { createContext } from 'react';
import { SERVER_STATUS } from '@config/app';
import { Server } from './types';

const ctx = createContext<Server>({
  key: '',
  numberOfPlayers: 0,
  numberOfTribes: 0,
  numberOfVillages: 0,
  dataUpdatedAt: new Date(0).toJSON(),
  historyUpdatedAt: new Date(0).toJSON(),
  statsUpdatedAt: new Date(0).toJSON(),
  status: SERVER_STATUS.OPEN,
  version: {
    code: '',
    host: '',
  },
});

export default ctx;
