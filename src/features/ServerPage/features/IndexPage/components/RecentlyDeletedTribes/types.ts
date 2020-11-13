import { List } from '@libs/graphql/types';

export type Tribe = {
  id: number;
  name: string;
  mostPoints: number;
  deletedAt: string | Date;
};

export type TribeList = {
  tribes?: List<Tribe[]>;
};
