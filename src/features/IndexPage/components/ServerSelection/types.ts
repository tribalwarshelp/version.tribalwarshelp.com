import { List } from 'libs/graphql/types';
import { ServerStatus } from 'config/app';

export type Server = {
  key: string;
  status: ServerStatus;
  numberOfPlayers: number;
  numberOfTribes: number;
  numberOfVillages: number;
};

export type ServerList = {
  servers?: List<Server[]>;
};
