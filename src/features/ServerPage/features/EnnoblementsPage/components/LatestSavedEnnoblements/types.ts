import { List } from '@libs/graphql/types';

export type Ennoblement = {
  village: {
    id: number;
    name: string;
    x: number;
    y: number;
  };
  newOwner: {
    id: number;
    name: string;
  };
  newOwnerTribe?: {
    id: number;
    tag: string;
  };
  oldOwner?: {
    id: number;
    name: string;
  };
  oldOwnerTribe?: {
    id: number;
    tag: string;
  };
  ennobledAt: Date | string;
};

export type Ennoblements = {
  ennoblements?: List<Ennoblement[]>;
};
