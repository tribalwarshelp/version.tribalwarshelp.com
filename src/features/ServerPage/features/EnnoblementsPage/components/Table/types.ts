import { Maybe } from 'libs/graphql/types';

export interface Tribe {
  id: number;
  tag: string;
}

export interface Player {
  id: number;
  name: string;
  tribe?: Maybe<Tribe>;
}

export interface Village {
  id: number;
  name: string;
  x: number;
  y: number;
}

export interface Ennoblement {
  village?: Maybe<Village>;
  newOwner?: Maybe<Player>;
  newOwnerTribe?: Maybe<Tribe>;
  oldOwner?: Maybe<Player>;
  oldOwnerTribe?: Maybe<Tribe>;
  ennobledAt: Date | string;
}
