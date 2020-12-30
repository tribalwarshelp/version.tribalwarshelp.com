export interface Tribe {
  id: number;
  tag: string;
}

export interface Player {
  id: number;
  name: string;
  tribe?: Tribe;
}

export interface Ennoblement {
  village: {
    id: number;
    name: string;
    x: number;
    y: number;
  };
  newOwner?: Player;
  newOwnerTribe?: Tribe;
  oldOwner?: Player;
  oldOwnerTribe?: Tribe;
  ennobledAt: Date | string;
}
