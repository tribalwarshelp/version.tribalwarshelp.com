export type Player = {
  id: number;
  name: string;
  exists: boolean;
  tribe?: {
    id: number;
    tag: string;
    name: string;
  };
};

export type PlayerQueryResult = {
  player?: Player;
};

export type Params = {
  key: string;
  id: string;
};
