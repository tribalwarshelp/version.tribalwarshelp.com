import { createContext } from 'react';
import { Tribe } from 'libs/graphql/types';

const ctx = createContext<Tribe>({
  id: 0,
  name: '',
  tag: '',
  exists: false,
  rank: 0,
  points: 0,
  allPoints: 0,
  totalVillages: 0,
  dominance: 0.0,
  scoreAtt: 0,
  rankAtt: 0,
  scoreDef: 0,
  rankDef: 0,
  scoreTotal: 0,
  rankTotal: 0,
  mostPoints: 0,
  mostPointsAt: new Date(0),
  mostVillages: 0,
  mostVillagesAt: new Date(0),
  bestRank: 0,
  bestRankAt: new Date(0),
  createdAt: new Date(0),
  deletedAt: new Date(0),
  totalMembers: 0,
});

export default ctx;
