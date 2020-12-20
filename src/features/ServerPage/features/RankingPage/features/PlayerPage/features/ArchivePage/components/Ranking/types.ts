import { List } from '@libs/graphql/types';

export type Player = {
  id: number;
  name: string;
  mostPoints: number;
  bestRank: number;
  mostVillages: number;
  deletedAt: string | Date;
};

export type PlayerList = {
  players?: List<Player[]>;
};
