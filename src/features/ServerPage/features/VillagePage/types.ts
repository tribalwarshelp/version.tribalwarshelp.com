export type Village = {
  id: number;
  x: number;
  y: number;
  name: string;
  bonus: number;
  points: number;
  fullName: string;
  player?: {
    id: number;
    name: string;
    tribe?: {
      id: number;
      tag: string;
    };
  };
};

export type Params = {
  id: string;
  key: string;
};
