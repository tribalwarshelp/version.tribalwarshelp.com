import { List } from 'libs/graphql/types';

export type Player = {
  server: string;
  id: number;
  name: string;
  bestRank: number;
  mostPoints: number;
  mostVillages: number;
  tribeID: number;
  tribeTag: string;
};

export type PlayerList = {
  foundPlayers?: List<Player[]>;
};
