import { List } from '@libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
};

export type DailyTribeStatsRecord = {
  scoreAtt: number;
  scoreDef: number;
  scoreSup: number;
  scoreTotal: number;
  points: number;
  villages: number;
  createDate: string;
  tribe: Tribe;
};

export type DailyTribeStatsList = {
  dailyTribeStats?: List<DailyTribeStatsRecord[]>;
};

export type Mode =
  | 'scoreAtt'
  | 'scoreDef'
  | 'scoreTotal'
  | 'points'
  | 'villages';
