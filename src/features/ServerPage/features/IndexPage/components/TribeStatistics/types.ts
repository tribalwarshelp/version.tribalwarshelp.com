import { List } from 'libs/graphql/types';

export type Item = {
  activeTribes: number;
  createDate: string | Date;
};

export type ServerStats = {
  serverStats?: List<Item[]>;
};
