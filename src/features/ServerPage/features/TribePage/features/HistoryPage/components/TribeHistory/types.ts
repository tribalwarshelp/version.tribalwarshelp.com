import {
  DailyTribeStatsFilter,
  TribeHistoryFilter,
  Query,
} from 'libs/graphql/types';

export type TribeHistory = Pick<Query, 'dailyTribeStats' | 'tribeHistory'>;

export type Variables = {
  server: string;
  tribeHistoryFilter?: TribeHistoryFilter;
  dailyTribeStatsFilter?: DailyTribeStatsFilter;
  offset?: number;
  sort?: string[];
  tribeHistoryLimit?: number;
  dailyTribeStatsLimit?: number;
};
