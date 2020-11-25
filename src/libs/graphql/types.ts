export type List<T> = {
  total: number;
  items: T;
};

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

export type PlayersQueryVariables = {
  server: string;
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: PlayerFilter;
};

export type TribeFilter = {
  id?: number[];
  exists?: boolean;
  deletedAtGT?: Date | string;
  rankAttGTE?: number;
  rankDefGTE?: number;
  rankSupGTE?: number;
  rankTotalGTE?: number;
};

export type TribesQueryVariables = {
  server: string;
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: TribeFilter;
};

export type ServerFilter = {
  key?: string[];
  keyIEQ?: string;
  versionCode?: string[];
};

export type ServersQueryVariables = {
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: ServerFilter;
};

export type VersionFilter = {
  code?: string[];
  codeNEQ?: string[];
};

export type VersionsQueryVariables = {
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: VersionFilter;
};

export type DailyPlayerStatsFilter = {
  createDateGT?: Date | 'string';
  player?: PlayerFilter;
};

export type DailyPlayerStatsQueryVariables = {
  server: string;
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: DailyPlayerStatsFilter;
};

export type DailyTribeStatsFilter = {
  createDateGT?: Date | 'string';
};

export type DailyTribeStatsQueryVariables = {
  server: string;
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: DailyTribeStatsFilter;
};

export type ServerStatsFilter = {
  createDateGT?: Date | 'string';
};

export type ServerStatsQueryVariables = {
  server: string;
  sort?: string[];
  limit?: number;
  offset?: number;
  filter?: ServerStatsFilter;
};

export type PlayerQueryVariables = {
  server: string;
  id: number;
};
