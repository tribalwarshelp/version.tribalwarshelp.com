export type NameChange = {
  oldName: string;
  newName: string;
  changeDate: Date | string;
};

export type Player = {
  id: number;
  name: string;
  exists: boolean;
  rank: number;
  points: number;
  totalVillages: number;
  dailyGrowth: number;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreSup: number;
  rankSup: number;
  scoreTotal: number;
  rankTotal: number;
  mostPoints: number;
  mostPointsAt: Date | string;
  mostVillages: number;
  mostVillagesAt: Date | string;
  bestRank: number;
  bestRankAt: Date | string;
  joinedAt: Date | string;
  deletedAt?: Date | string;
  servers: string[];
  nameChanges: NameChange[];
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
