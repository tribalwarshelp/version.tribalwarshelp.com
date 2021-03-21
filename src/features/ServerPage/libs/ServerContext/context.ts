import { createContext } from 'react';
import { ServerStatus } from 'libs/graphql/types';
import { Server } from './types';

const ctx = createContext<Server>({
  key: '',
  numberOfPlayers: 0,
  numberOfTribes: 0,
  numberOfVillages: 0,
  dataUpdatedAt: new Date(0).toJSON(),
  historyUpdatedAt: new Date(0).toJSON(),
  statsUpdatedAt: new Date(0).toJSON(),
  status: ServerStatus.OPEN,
});

export default ctx;
