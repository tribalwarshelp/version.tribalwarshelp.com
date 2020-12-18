import {
  List,
  PlayersQueryVariables,
  DailyPlayerStatsQueryVariables,
} from '@libs/graphql/types';

export type Mode =
  | 'points'
  | 'villages'
  | 'scoreAtt'
  | 'scoreDef'
  | 'scoreSup'
  | 'scoreTotal';

export type DailyPlayerStatsRecord = {
  points: number;
  scoreAtt: number;
  scoreDef: number;
  scoreSup: number;
  scoreTotal: number;
  villages: number;
  createDate: string | Date;
  player: {
    id: number;
  };
};

export type Player = {
  id: number;
  name: string;
  rank: number;
  points: number;
  totalVillages: number;
  dailyPlayerStatsRecords?: DailyPlayerStatsRecord[];
};

export type PlayersAndDailyPlayerStatsQueryResult = {
  players?: List<Player[]>;
  dailyPlayerStats?: List<DailyPlayerStatsRecord[]>;
};

export type PlayersAndDailyPlayerStatsQueryVariables = {
  dailyPlayerStatsFilter?: DailyPlayerStatsQueryVariables['filter'];
  dailyPlayerStatsSort?: DailyPlayerStatsQueryVariables['sort'];
  playerFilter?: PlayersQueryVariables['filter'];
  playersSort?: PlayersQueryVariables['sort'];
  limit?: number;
  offset?: number;
  server?: string;
};
