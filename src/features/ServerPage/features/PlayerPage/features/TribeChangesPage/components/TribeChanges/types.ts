import { List } from '@libs/graphql/types';

export type TribeChange = {
  oldTribe?: {
    id: number;
    tag: string;
  };
  newTribe?: {
    id: number;
    tag: string;
  };
  createdAt: Date | string;
};

export type TribeChangesQuery = {
  tribeChanges?: List<TribeChange[]>;
};
