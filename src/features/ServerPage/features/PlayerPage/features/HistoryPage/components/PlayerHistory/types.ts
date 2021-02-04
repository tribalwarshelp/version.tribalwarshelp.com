import {
  DailyPlayerStatsFilter,
  List,
  PlayerHistoryFilter,
} from 'libs/graphql/types';

export type DailyPlayerStatsItem = {
  points: number;
  villages: number;
  scoreAtt: number;
  scoreDef: number;
  scoreSup: number;
  scoreTotal: number;
  createDate: string | Date;
};

export type PlayerHistoryItem = {
  rank: number;
  points: number;
  totalVillages: number;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreSup: number;
  rankSup: number;
  scoreTotal: number;
  rankTotal: number;
  createDate: string | Date;
  tribe?: {
    id: number;
    tag: string;
  };
  stats?: DailyPlayerStatsItem;
};

export type PlayerHistory = {
  playerHistory?: List<PlayerHistoryItem[]>;
  dailyPlayerStats?: List<DailyPlayerStatsItem[]>;
};

export type Variables = {
  server: string;
  playerHistoryFilter?: PlayerHistoryFilter;
  dailyPlayerStatsFilter?: DailyPlayerStatsFilter;
  offset?: number;
  sort?: string[];
  playerHistoryLimit?: number;
  dailyPlayerStatsLimit?: number;
};
