import { List } from 'libs/graphql/types';

export type Player = {
  id: number;
  name: string;
  tribe?: {
    id: number;
    tag: string;
  };
};

export type DailyPlayerStatsRecord = {
  scoreAtt: number;
  scoreDef: number;
  scoreSup: number;
  scoreTotal: number;
  points: number;
  villages: number;
  createDate: string;
  player: Player;
};

export type DailyPlayerStatsList = {
  dailyPlayerStats?: List<DailyPlayerStatsRecord[]>;
};

export type Mode =
  | 'scoreAtt'
  | 'scoreDef'
  | 'scoreSup'
  | 'scoreTotal'
  | 'points'
  | 'villages';
