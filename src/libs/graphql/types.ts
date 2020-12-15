export type List<T> = {
  total: number;
  items: T;
};

type QueryVariables<T> = {
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: T;
};

type QueryVariablesWithServer<T> = QueryVariables<T> & {
  server: string;
};

export type VersionFilter = {
  code?: string[];
  codeNEQ?: string[];
};

export type VersionsQueryVariables = QueryVariables<VersionFilter>;

export type ServerFilter = {
  key?: string[];
  keyIEQ?: string;
  versionCode?: string[];
};

export type ServersQueryVariables = QueryVariables<ServerFilter>;

export type ServerStatsFilter = {
  createDateGT?: Date | 'string';
};

export type ServerStatsQueryVariables = QueryVariablesWithServer<
  ServerStatsFilter
>;

export type PlayerFilter = {
  id?: number[];
  exists?: boolean;
  tribeFilter?: TribeFilter;
  deletedAtGT?: Date | string;
  rankAttGTE?: number;
  rankDefGTE?: number;
  rankSupGTE?: number;
  rankTotalGTE?: number;
};

export type PlayersQueryVariables = QueryVariablesWithServer<PlayerFilter>;

export type PlayerQueryVariables = {
  server: string;
  id: number;
};

export type PlayerHistoryFilter = {
  playerID?: number[];
  createDateGT?: Date | 'string';
};

export type PlayerHistoryQueryVariables = QueryVariablesWithServer<
  PlayerHistoryFilter
>;

export type DailyPlayerStatsFilter = {
  createDateGT?: Date | 'string';
  player?: PlayerFilter;
  playerID?: number[];
};

export type DailyPlayerStatsQueryVariables = QueryVariablesWithServer<
  DailyPlayerStatsFilter
>;

export type TribeFilter = {
  id?: number[];
  exists?: boolean;
  deletedAtGT?: Date | string;
  rankAttGTE?: number;
  rankDefGTE?: number;
  rankSupGTE?: number;
  rankTotalGTE?: number;
};

export type TribesQueryVariables = QueryVariablesWithServer<TribeFilter>;

export type TribeQueryVariables = {
  server: string;
  id: number;
};

export type TribeHistoryFilter = {
  tribeID?: number[];
  createDateGT?: Date | 'string';
};

export type TribeHistoryQueryVariables = QueryVariablesWithServer<
  TribeHistoryFilter
>;

export type TribeChangesFilter = {
  playerID?: number[];
  playerIDNEQ?: number[];
  or?: {
    oldTribeID?: number[];
    newTribeID?: number[];
  };
};

export type TribeChangesQueryVariables = QueryVariablesWithServer<
  TribeChangesFilter
>;

export type EnnoblementFilter = {
  or?: {
    newOwnerID?: number[];
    newOwnerTribeID?: number[];
    oldOwnerID?: number[];
    oldOwnerTribeID?: number[];
  };
};

export type EnnoblementsQueryVariables = QueryVariablesWithServer<
  EnnoblementFilter
>;

export type DailyTribeStatsFilter = {
  createDateGT?: Date | 'string';
  tribeID?: number[];
};

export type DailyTribeStatsQueryVariables = QueryVariablesWithServer<
  DailyTribeStatsFilter
>;
