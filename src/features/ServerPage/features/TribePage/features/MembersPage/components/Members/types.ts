import { List } from '@libs/graphql/types';

export type Player = {
  id: number;
  name: string;
  rank: number;
  points: number;
  totalVillages: number;
};

export type PlayersQuery = {
  players?: List<Player[]>;
};
