import { List } from 'libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
};

export type DailyTribeStatsRecord = {
  scoreAtt: number;
  scoreDef: number;
  scoreTotal: number;
  points: number;
  villages: number;
  createDate: string;
  tribe: Tribe;
};

export type DailyStats = {
  dailyTribeStats?: List<DailyTribeStatsRecord[]>;
};
