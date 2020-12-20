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
  createDateGT?: Date | string;
};

export type ServerStatsQueryVariables = QueryVariablesWithServer<
  ServerStatsFilter
>;

export type PlayerFilter = {
  id?: number[];
  tribeID?: number[];
  exists?: boolean;
  tribeFilter?: TribeFilter;
  deletedAtGT?: Date | string;
  rankAttGTE?: number;
  rankDefGTE?: number;
  rankSupGTE?: number;
  rankTotalGTE?: number;
  nameIEQ?: string;
};

export type PlayersQueryVariables = QueryVariablesWithServer<PlayerFilter>;

export type PlayerQueryVariables = {
  server: string;
  id: number;
};

export type PlayerHistoryFilter = {
  playerID?: number[];
  createDateGT?: Date | string;
};

export type PlayerHistoryQueryVariables = QueryVariablesWithServer<
  PlayerHistoryFilter
>;

export type DailyPlayerStatsFilter = {
  createDateGT?: Date | string;
  createDateGTE?: Date | string;
  createDateLTE?: Date | string;
  playerFilter?: PlayerFilter;
  playerID?: number[];
};

export type DailyPlayerStatsQueryVariables = QueryVariablesWithServer<
  DailyPlayerStatsFilter
>;

export type TribeFilter = {
  id?: number[];
  exists?: boolean;
  tagIEQ?: string;
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
  createDateGT?: Date | string;
};

export type TribeHistoryQueryVariables = QueryVariablesWithServer<
  TribeHistoryFilter
>;

export type TribeChangeFilter = {
  playerID?: number[];
  playerIDNEQ?: number[];
  or?: {
    oldTribeID?: number[];
    newTribeID?: number[];
  };
};

export type TribeChangesQueryVariables = QueryVariablesWithServer<
  TribeChangeFilter
>;

export type EnnoblementFilter = {
  or?: {
    newOwnerID?: number[];
    newOwnerTribeID?: number[];
    oldOwnerID?: number[];
    oldOwnerTribeID?: number[];
  };
  villageID?: number[];
};

export type EnnoblementsQueryVariables = QueryVariablesWithServer<
  EnnoblementFilter
>;

export type DailyTribeStatsFilter = {
  createDateGT?: Date | string;
  createDateGTE?: Date | string;
  tribeID?: number[];
  tribeFilter?: TribeFilter;
};

export type DailyTribeStatsQueryVariables = QueryVariablesWithServer<
  DailyTribeStatsFilter
>;

export type VillageQueryVariables = {
  server: string;
  id: number;
};
