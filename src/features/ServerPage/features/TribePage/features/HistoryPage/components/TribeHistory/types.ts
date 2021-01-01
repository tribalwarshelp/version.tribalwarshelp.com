import {
  DailyTribeStatsFilter,
  List,
  TribeHistoryFilter,
} from '@libs/graphql/types';

export type DailyTribeStatsItem = {
  points: number;
  villages: number;
  scoreAtt: number;
  scoreDef: number;
  scoreTotal: number;
  createDate: string | Date;
};

export type TribeHistoryItem = {
  rank: number;
  points: number;
  dominance: number;
  totalVillages: number;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreTotal: number;
  rankTotal: number;
  createDate: string | Date;
  stats?: DailyTribeStatsItem;
};

export type TribeHistory = {
  tribeHistory?: List<TribeHistoryItem[]>;
  dailyTribeStats?: List<DailyTribeStatsItem[]>;
};

export type Variables = {
  server: string;
  tribeHistoryFilter?: TribeHistoryFilter;
  dailyTribeStatsFilter?: DailyTribeStatsFilter;
  offset?: number;
  sort?: string[];
  tribeHistoryLimit?: number;
  dailyTribeStatsLimit?: number;
};
