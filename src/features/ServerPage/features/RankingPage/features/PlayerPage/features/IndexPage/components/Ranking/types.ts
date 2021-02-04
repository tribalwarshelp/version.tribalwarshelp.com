import { List } from 'libs/graphql/types';

export type Player = {
  id: number;
  name: string;
  points: number;
  rank: number;
  dailyGrowth: number;
  totalVillages: number;
  tribe?: {
    id: number;
    tag: string;
  };
};

export type PlayerList = {
  players?: List<Player[]>;
};
