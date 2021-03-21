export type Marker<T = undefined> = {
  id: string;
  item: T | null;
  color: string;
};

export type Settings = {
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
  playerVillageColor: string;
  barbarianVillageColor: string;
};

export interface HasID {
  id: number;
}
