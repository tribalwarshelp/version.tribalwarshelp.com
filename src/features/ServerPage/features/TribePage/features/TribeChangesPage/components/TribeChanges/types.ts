import { List } from 'libs/graphql/types';

export type TribeChange = {
  oldTribe?: {
    id: number;
    tag: string;
  };
  newTribe?: {
    id: number;
    tag: string;
  };
  player: {
    id: number;
    name: string;
  };
  createdAt: Date | string;
};

export type TribeChangesQuery = {
  tribeChanges?: List<TribeChange[]>;
};
