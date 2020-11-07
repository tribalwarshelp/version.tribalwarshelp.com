import { List } from '@libs/graphql/types';

export type Server = {
  key: string;
  status: string;
  numberOfPlayers: number;
  numberOfTribes: number;
  numberOfVillages: number;
};

export type ServerList = {
  servers?: List<Server[]>;
};
