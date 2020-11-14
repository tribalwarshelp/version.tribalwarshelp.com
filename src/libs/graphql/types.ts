export type List<T> = {
  total: number;
  items: T;
};

export type PlayerFilter = {
  limit?: number;
  offset?: number;
  sort?: string;
  id?: number[];
  tribeFilter?: TribeFilter;
  deletedAtGT?: Date | string;
};

export type PlayersQueryVariables = {
  server: string;
  filter?: PlayerFilter;
};

export type TribeFilter = {
  limit?: number;
  offset?: number;
  sort?: string;
  id?: number[];
  deletedAtGT?: Date | string;
};

export type TribesQueryVariables = {
  server: string;
  filter?: TribeFilter;
};

export type ServerFilter = {
  limit?: number;
  offset?: number;
  sort?: string;
  key?: string[];
  keyIEQ?: string;
  versionCode?: string[];
};

export type ServersQueryVariables = {
  filter?: ServerFilter;
};

export type VersionFilter = {
  limit?: number;
  offset?: number;
  sort?: string;
  code?: string[];
  codeNEQ?: string[];
};

export type VersionsQueryVariables = {
  filter?: VersionFilter;
};
