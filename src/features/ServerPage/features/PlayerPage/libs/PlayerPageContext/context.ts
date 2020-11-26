import { createContext } from 'react';
import { Player } from './types';

const ctx = createContext<Player>({
  id: 0,
  name: '',
  exists: false,
  rank: 0,
  points: 0,
  totalVillages: 0,
  dailyGrowth: 0,
  scoreAtt: 0,
  rankAtt: 0,
  scoreDef: 0,
  rankDef: 0,
  scoreSup: 0,
  rankSup: 0,
  scoreTotal: 0,
  rankTotal: 0,
  mostPoints: 0,
  mostPointsAt: new Date(),
  mostVillages: 0,
  mostVillagesAt: new Date(),
  bestRank: 0,
  bestRankAt: new Date(),
  joinedAt: new Date(),
  servers: [],
  nameChanges: [],
});

export default ctx;
