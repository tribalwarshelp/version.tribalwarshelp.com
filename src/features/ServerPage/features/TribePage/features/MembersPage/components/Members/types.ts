import {
  Query,
  QueryPlayersArgs,
  QueryDailyPlayerStatsArgs,
} from 'libs/graphql/types';

export type Mode =
  | 'points'
  | 'villages'
  | 'scoreAtt'
  | 'scoreDef'
  | 'scoreSup'
  | 'scoreTotal';

export type PlayersAndDailyPlayerStatsQueryResult = Pick<
  Query,
  'players' | 'dailyPlayerStats'
>;

export type PlayersAndQueryDailyPlayerStatsArgs = {
  dailyPlayerStatsFilter?: QueryDailyPlayerStatsArgs['filter'];
  dailyPlayerStatsSort?: QueryDailyPlayerStatsArgs['sort'];
  playerFilter?: QueryPlayersArgs['filter'];
  playersSort?: QueryPlayersArgs['sort'];
  limit?: number;
  offset?: number;
  server?: string;
};
