import { List } from '@libs/graphql/types';

export type Server = {
  key: string;
  status: string;
  numberOfPlayers: number;
  numberOfTribes: number;
  numberOfVillages: number;
  dataUpdatedAt: string | Date;
};

export type ServerList = {
  servers?: List<Server[]>;
};
