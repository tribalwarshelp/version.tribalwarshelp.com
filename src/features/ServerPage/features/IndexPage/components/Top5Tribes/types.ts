import { List } from 'libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
  points: number;
  rank: number;
  dominance: number;
};

export type TribeList = {
  tribes?: List<Tribe[]>;
};
