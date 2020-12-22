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
    tribe?: {
      id: number;
      tag: string;
    };
  };
  oldOwner?: {
    id: number;
    name: string;
    tribe?: {
      id: number;
      tag: string;
    };
  };
  ennobledAt: Date | string;
};

export type LiveEnnoblements = {
  liveEnnoblements?: Ennoblement[];
};
