export type List<T> = {
  total: number;
  items: T;
};

export type PlayerFilter = {
  id?: number[];
  tribeFilter?: TribeFilter;
  deletedAtGT?: Date | string;
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
  deletedAtGT?: Date | string;
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
