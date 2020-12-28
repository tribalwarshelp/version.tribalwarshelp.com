import { List } from '@libs/graphql/types';
import { ServerStatus } from '@config/app';

export type Server = {
  key: string;
  status: ServerStatus;
  numberOfPlayers: number;
  numberOfTribes: number;
  numberOfVillages: number;
  dataUpdatedAt: string;
  historyUpdatedAt: string;
  statsUpdatedAt: string;
  version: {
    code: string;
    host: string;
  };
};

export type ServerList = {
  servers?: List<Server[]>;
};

export type Params = {
  key: string;
};
