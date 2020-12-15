export type Tribe = {
  id: number;
  name: string;
  tag: string;
  exists: boolean;
  rank: number;
  points: number;
  allPoints: number;
  totalVillages: number;
  dominance: number;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreTotal: number;
  rankTotal: number;
  mostPoints: number;
  mostPointsAt: Date | string;
  mostVillages: number;
  mostVillagesAt: Date | string;
  bestRank: number;
  bestRankAt: Date | string;
  createdAt: Date | string;
  deletedAt?: Date | string;
};

export type TribeQueryResult = {
  tribe?: Tribe;
};

export type Params = {
  key: string;
  id: string;
};
