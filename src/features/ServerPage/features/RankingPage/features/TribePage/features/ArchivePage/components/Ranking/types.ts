import { List } from 'libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
  mostPoints: number;
  bestRank: number;
  mostVillages: number;
  deletedAt: string | Date;
};

export type TribeList = {
  tribes?: List<Tribe[]>;
};
