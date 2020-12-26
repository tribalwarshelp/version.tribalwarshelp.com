import { List } from '@libs/graphql/types';

export type Tribe = {
  server: string;
  id: number;
  name: string;
  tag: string;
  bestRank: number;
  mostPoints: number;
  mostVillages: number;
};

export type TribeList = {
  foundTribes?: List<Tribe[]>;
};
