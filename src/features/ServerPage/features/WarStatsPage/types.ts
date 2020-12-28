import { List } from '@libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
};

export type TribeList = {
  tribes?: List<Tribe[]>;
};

export type Player = {
  id: number;
  name: string;
};

export type PlayerList = {
  players?: List<Player[]>;
};
