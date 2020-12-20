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

export type Marker<T = undefined> = {
  id: string;
  item?: T | null;
  color: string;
};
export type PlayerMarker = Marker<Player>;
export type TribeMarker = Marker<Tribe>;

export type Settings = Object & {
  showBarbarian: boolean;
  largerMarkers: boolean;
  markersOnly: boolean;
  centerX: number;
  centerY: number;
  scale: number;
  showGrid: boolean;
  showContinentNumbers: boolean;
  backgroundColor: string;
  gridLineColor: string;
  continentNumberColor: string;
};
