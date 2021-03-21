import {
  DailyPlayerStatsFilter,
  PlayerHistoryFilter,
  Query,
} from 'libs/graphql/types';

export type PlayerHistory = Pick<Query, 'dailyPlayerStats' | 'playerHistory'>;

export type Variables = {
  server: string;
  playerHistoryFilter?: PlayerHistoryFilter;
  dailyPlayerStatsFilter?: DailyPlayerStatsFilter;
  offset?: number;
  sort?: string[];
  playerHistoryLimit?: number;
  dailyPlayerStatsLimit?: number;
};
