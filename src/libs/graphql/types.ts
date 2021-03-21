export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: Date | string;
};


export type Building = {
  maxLevel: Scalars['Int'];
  minLevel: Scalars['Int'];
  wood: Scalars['Int'];
  stone: Scalars['Int'];
  iron: Scalars['Int'];
  pop: Scalars['Int'];
  woodFactor: Scalars['Float'];
  stoneFactor: Scalars['Float'];
  ironFactor: Scalars['Float'];
  popFactor: Scalars['Float'];
  buildTime: Scalars['Float'];
  buildTimeFactor: Scalars['Float'];
};

export type PlayerList = {
  items?: Maybe<Array<Player>>;
  total: Scalars['Int'];
};

export enum ServerStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export type Tribe = {
  id: Scalars['Int'];
  name: Scalars['String'];
  tag: Scalars['String'];
  totalMembers: Scalars['Int'];
  totalVillages: Scalars['Int'];
  points: Scalars['Int'];
  allPoints: Scalars['Int'];
  rank: Scalars['Int'];
  exists: Scalars['Boolean'];
  rankAtt: Scalars['Int'];
  scoreAtt: Scalars['Int'];
  rankDef: Scalars['Int'];
  scoreDef: Scalars['Int'];
  rankTotal: Scalars['Int'];
  scoreTotal: Scalars['Int'];
  dominance: Scalars['Float'];
  bestRank: Scalars['Int'];
  bestRankAt: Scalars['Time'];
  mostPoints: Scalars['Int'];
  mostPointsAt: Scalars['Time'];
  mostVillages: Scalars['Int'];
  mostVillagesAt: Scalars['Time'];
  createdAt: Scalars['Time'];
  deletedAt?: Maybe<Scalars['Time']>;
};

export type Village = {
  id: Scalars['Int'];
  name: Scalars['String'];
  points: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
  bonus: Scalars['Int'];
  player?: Maybe<Player>;
};

export type PlayerFilter = {
  id?: Maybe<Array<Scalars['Int']>>;
  idNEQ?: Maybe<Array<Scalars['Int']>>;
  exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Array<Scalars['String']>>;
  nameNEQ?: Maybe<Array<Scalars['String']>>;
  nameMATCH?: Maybe<Scalars['String']>;
  nameIEQ?: Maybe<Scalars['String']>;
  totalVillages?: Maybe<Scalars['Int']>;
  totalVillagesGT?: Maybe<Scalars['Int']>;
  totalVillagesGTE?: Maybe<Scalars['Int']>;
  totalVillagesLT?: Maybe<Scalars['Int']>;
  totalVillagesLTE?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Int']>;
  pointsGT?: Maybe<Scalars['Int']>;
  pointsGTE?: Maybe<Scalars['Int']>;
  pointsLT?: Maybe<Scalars['Int']>;
  pointsLTE?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  rankGT?: Maybe<Scalars['Int']>;
  rankGTE?: Maybe<Scalars['Int']>;
  rankLT?: Maybe<Scalars['Int']>;
  rankLTE?: Maybe<Scalars['Int']>;
  rankAtt?: Maybe<Scalars['Int']>;
  rankAttGT?: Maybe<Scalars['Int']>;
  rankAttGTE?: Maybe<Scalars['Int']>;
  rankAttLT?: Maybe<Scalars['Int']>;
  rankAttLTE?: Maybe<Scalars['Int']>;
  scoreAtt?: Maybe<Scalars['Int']>;
  scoreAttGT?: Maybe<Scalars['Int']>;
  scoreAttGTE?: Maybe<Scalars['Int']>;
  scoreAttLT?: Maybe<Scalars['Int']>;
  scoreAttLTE?: Maybe<Scalars['Int']>;
  rankDef?: Maybe<Scalars['Int']>;
  rankDefGT?: Maybe<Scalars['Int']>;
  rankDefGTE?: Maybe<Scalars['Int']>;
  rankDefLT?: Maybe<Scalars['Int']>;
  rankDefLTE?: Maybe<Scalars['Int']>;
  scoreDef?: Maybe<Scalars['Int']>;
  scoreDefGT?: Maybe<Scalars['Int']>;
  scoreDefGTE?: Maybe<Scalars['Int']>;
  scoreDefLT?: Maybe<Scalars['Int']>;
  scoreDefLTE?: Maybe<Scalars['Int']>;
  rankSup?: Maybe<Scalars['Int']>;
  rankSupGT?: Maybe<Scalars['Int']>;
  rankSupGTE?: Maybe<Scalars['Int']>;
  rankSupLT?: Maybe<Scalars['Int']>;
  rankSupLTE?: Maybe<Scalars['Int']>;
  scoreSup?: Maybe<Scalars['Int']>;
  scoreSupGT?: Maybe<Scalars['Int']>;
  scoreSupGTE?: Maybe<Scalars['Int']>;
  scoreSupLT?: Maybe<Scalars['Int']>;
  scoreSupLTE?: Maybe<Scalars['Int']>;
  rankTotal?: Maybe<Scalars['Int']>;
  rankTotalGT?: Maybe<Scalars['Int']>;
  rankTotalGTE?: Maybe<Scalars['Int']>;
  rankTotalLT?: Maybe<Scalars['Int']>;
  rankTotalLTE?: Maybe<Scalars['Int']>;
  scoreTotal?: Maybe<Scalars['Int']>;
  scoreTotalGT?: Maybe<Scalars['Int']>;
  scoreTotalGTE?: Maybe<Scalars['Int']>;
  scoreTotalLT?: Maybe<Scalars['Int']>;
  scoreTotalLTE?: Maybe<Scalars['Int']>;
  dailyGrowth?: Maybe<Scalars['Int']>;
  dailyGrowthGT?: Maybe<Scalars['Int']>;
  dailyGrowthGTE?: Maybe<Scalars['Int']>;
  dailyGrowthLT?: Maybe<Scalars['Int']>;
  dailyGrowthLTE?: Maybe<Scalars['Int']>;
  joinedAt?: Maybe<Scalars['Time']>;
  joinedAtGT?: Maybe<Scalars['Time']>;
  joinedAtGTE?: Maybe<Scalars['Time']>;
  joinedAtLT?: Maybe<Scalars['Time']>;
  joinedAtLTE?: Maybe<Scalars['Time']>;
  lastActivityAt?: Maybe<Scalars['Time']>;
  lastActivityAtGT?: Maybe<Scalars['Time']>;
  lastActivityAtGTE?: Maybe<Scalars['Time']>;
  lastActivityAtLT?: Maybe<Scalars['Time']>;
  lastActivityAtLTE?: Maybe<Scalars['Time']>;
  deletedAt?: Maybe<Scalars['Time']>;
  deletedAtGT?: Maybe<Scalars['Time']>;
  deletedAtGTE?: Maybe<Scalars['Time']>;
  deletedAtLT?: Maybe<Scalars['Time']>;
  deletedAtLTE?: Maybe<Scalars['Time']>;
  tribeID?: Maybe<Array<Scalars['Int']>>;
  tribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  tribeFilter?: Maybe<TribeFilter>;
};

export type ServerConfigBuildings = {
  customMain: Scalars['Int'];
  customFarm: Scalars['Int'];
  customStorage: Scalars['Int'];
  customPlace: Scalars['Int'];
  customBarracks: Scalars['Int'];
  customChurch: Scalars['Int'];
  customSmith: Scalars['Int'];
  customWood: Scalars['Int'];
  customStone: Scalars['Int'];
  customIron: Scalars['Int'];
  customMarket: Scalars['Int'];
  customStable: Scalars['Int'];
  customWall: Scalars['Int'];
  customGarage: Scalars['Int'];
  customHide: Scalars['Int'];
  customSnob: Scalars['Int'];
  customStatue: Scalars['Int'];
  customWatchtower: Scalars['Int'];
};

export type ServerConfigNight = {
  active: Scalars['Int'];
  startHour: Scalars['Int'];
  endHour: Scalars['Int'];
  defFactor: Scalars['Float'];
};

export type EnnoblementFilter = {
  villageID?: Maybe<Array<Scalars['Int']>>;
  villageIDNEQ?: Maybe<Array<Scalars['Int']>>;
  villageFilter?: Maybe<VillageFilter>;
  newOwnerID?: Maybe<Array<Scalars['Int']>>;
  newOwnerIDNEQ?: Maybe<Array<Scalars['Int']>>;
  newOwnerFilter?: Maybe<PlayerFilter>;
  newOwnerTribeID?: Maybe<Array<Scalars['Int']>>;
  newOwnerTribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  newOwnerTribeFilter?: Maybe<TribeFilter>;
  oldOwnerID?: Maybe<Array<Scalars['Int']>>;
  oldOwnerIDNEQ?: Maybe<Array<Scalars['Int']>>;
  oldOwnerFilter?: Maybe<PlayerFilter>;
  oldOwnerTribeID?: Maybe<Array<Scalars['Int']>>;
  oldOwnerTribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  oldOwnerTribeFilter?: Maybe<TribeFilter>;
  ennobledAt?: Maybe<Scalars['Time']>;
  ennobledAtGT?: Maybe<Scalars['Time']>;
  ennobledAtGTE?: Maybe<Scalars['Time']>;
  ennobledAtLT?: Maybe<Scalars['Time']>;
  ennobledAtLTE?: Maybe<Scalars['Time']>;
  or?: Maybe<EnnoblementFilterOr>;
};

export type ServerConfigBuild = {
  destroy: Scalars['Int'];
};

export type ServerConfigWin = {
  check: Scalars['Int'];
};

export type TribeChangeRecord = {
  player?: Maybe<Player>;
  oldTribe?: Maybe<Tribe>;
  newTribe?: Maybe<Tribe>;
  createdAt: Scalars['Time'];
};

export type ServerConfigMisc = {
  killRanking: Scalars['Int'];
  tutorial: Scalars['Int'];
  tradeCancelTime: Scalars['Int'];
};

export type ServerConfigCommands = {
  millisArrival: Scalars['Int'];
  commandCancelTime: Scalars['Int'];
};

export type ServerStatsFilter = {
  createDate?: Maybe<Scalars['Time']>;
  createDateGT?: Maybe<Scalars['Time']>;
  createDateGTE?: Maybe<Scalars['Time']>;
  createDateLT?: Maybe<Scalars['Time']>;
  createDateLTE?: Maybe<Scalars['Time']>;
};

export type Version = {
  code: VersionCode;
  name: Scalars['String'];
  host: Scalars['String'];
  timezone: Scalars['String'];
};

export type Query = {
  dailyPlayerStats: DailyPlayerStats;
  dailyTribeStats: DailyTribeStats;
  ennoblements: EnnoblementList;
  players: PlayerList;
  player?: Maybe<Player>;
  searchPlayer: FoundPlayerList;
  playerHistory: PlayerHistory;
  servers: ServerList;
  server?: Maybe<Server>;
  serverStats: ServerStats;
  tribes: TribeList;
  tribe?: Maybe<Tribe>;
  searchTribe: FoundTribeList;
  tribeChanges: TribeChanges;
  tribeHistory: TribeHistory;
  versions: VersionList;
  version?: Maybe<Version>;
  villages: VillageList;
  village?: Maybe<Village>;
};


export type QueryDailyPlayerStatsArgs = {
  server: Scalars['String'];
  filter?: Maybe<DailyPlayerStatsFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryDailyTribeStatsArgs = {
  server: Scalars['String'];
  filter?: Maybe<DailyTribeStatsFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryEnnoblementsArgs = {
  server: Scalars['String'];
  filter?: Maybe<EnnoblementFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryPlayersArgs = {
  server: Scalars['String'];
  filter?: Maybe<PlayerFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryPlayerArgs = {
  server: Scalars['String'];
  id: Scalars['Int'];
};


export type QuerySearchPlayerArgs = {
  version: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryPlayerHistoryArgs = {
  server: Scalars['String'];
  filter?: Maybe<PlayerHistoryFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryServersArgs = {
  filter?: Maybe<ServerFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryServerArgs = {
  key: Scalars['String'];
};


export type QueryServerStatsArgs = {
  server: Scalars['String'];
  filter?: Maybe<ServerStatsFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryTribesArgs = {
  server: Scalars['String'];
  filter?: Maybe<TribeFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryTribeArgs = {
  server: Scalars['String'];
  id: Scalars['Int'];
};


export type QuerySearchTribeArgs = {
  version: Scalars['String'];
  query: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryTribeChangesArgs = {
  server: Scalars['String'];
  filter?: Maybe<TribeChangeFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryTribeHistoryArgs = {
  server: Scalars['String'];
  filter?: Maybe<TribeHistoryFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryVersionsArgs = {
  filter?: Maybe<VersionFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryVersionArgs = {
  code: VersionCode;
};


export type QueryVillagesArgs = {
  server: Scalars['String'];
  filter?: Maybe<VillageFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type QueryVillageArgs = {
  server: Scalars['String'];
  id: Scalars['Int'];
};

export type TribeHistoryFilter = {
  tribeID?: Maybe<Array<Scalars['Int']>>;
  tribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  tribeFilter?: Maybe<TribeFilter>;
  createDate?: Maybe<Scalars['Time']>;
  createDateGT?: Maybe<Scalars['Time']>;
  createDateGTE?: Maybe<Scalars['Time']>;
  createDateLT?: Maybe<Scalars['Time']>;
  createDateLTE?: Maybe<Scalars['Time']>;
};

export type FoundPlayer = {
  server: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  bestRank: Scalars['Int'];
  mostPoints: Scalars['Int'];
  mostVillages: Scalars['Int'];
  tribeID: Scalars['Int'];
  tribeTag: Scalars['String'];
};

export type FoundPlayerList = {
  items?: Maybe<Array<FoundPlayer>>;
  total: Scalars['Int'];
};

export type Server = {
  key: Scalars['String'];
  status: ServerStatus;
  numberOfPlayers: Scalars['Int'];
  numberOfTribes: Scalars['Int'];
  numberOfVillages: Scalars['Int'];
  version?: Maybe<Version>;
  config: ServerConfig;
  unitConfig: UnitConfig;
  buildingConfig: BuildingConfig;
  dataUpdatedAt: Scalars['Time'];
  historyUpdatedAt: Scalars['Time'];
  statsUpdatedAt: Scalars['Time'];
};

export type ServerConfigNewbie = {
  days: Scalars['Int'];
  ratioDays: Scalars['Int'];
  ratio: Scalars['Int'];
  removeNewbieVillages: Scalars['Int'];
};

export type ServerConfigGame = {
  buildtimeFormula: Scalars['Int'];
  knight: Scalars['Int'];
  knightNewItems: Scalars['Boolean'];
  archer: Scalars['Int'];
  tech: Scalars['Int'];
  farmLimit: Scalars['Int'];
  church: Scalars['Int'];
  watchtower: Scalars['Int'];
  stronghold: Scalars['Int'];
  fakeLimit: Scalars['Int'];
  barbarianRise: Scalars['Float'];
  barbarianShrink: Scalars['Int'];
  barbarianMaxPoints: Scalars['Int'];
  hauls: Scalars['Int'];
  haulsBase: Scalars['Int'];
  haulsMax: Scalars['Int'];
  baseProduction: Scalars['Int'];
  event: Scalars['Int'];
  suppressEvents: Scalars['Int'];
};

export type ServerConfigSitter = {
  allow: Scalars['Int'];
};

export type UnitConfig = {
  spear: Unit;
  sword: Unit;
  axe: Unit;
  archer: Unit;
  spy: Unit;
  light: Unit;
  marcher: Unit;
  heavy: Unit;
  ram: Unit;
  catapult: Unit;
  knight: Unit;
  snob: Unit;
  militia: Unit;
};

export type EnnoblementList = {
  items?: Maybe<Array<Ennoblement>>;
  total: Scalars['Int'];
};

export enum VersionCode {
  PL = 'PL',
  pl = 'pl',
  EN = 'EN',
  en = 'en',
  DE = 'DE',
  de = 'de',
  UK = 'UK',
  uk = 'uk',
  IT = 'IT',
  it = 'it',
  FR = 'FR',
  fr = 'fr',
  US = 'US',
  us = 'us',
  NL = 'NL',
  nl = 'nl',
  ES = 'ES',
  es = 'es',
  RO = 'RO',
  ro = 'ro',
  RU = 'RU',
  ru = 'ru',
  GR = 'GR',
  gr = 'gr',
  TR = 'TR',
  tr = 'tr',
  CS = 'CS',
  cs = 'cs',
  CH = 'CH',
  ch = 'ch',
  PT = 'PT',
  pt = 'pt',
  BR = 'BR',
  br = 'br',
  HU = 'HU',
  hu = 'hu',
  SK = 'SK',
  sk = 'sk'
}

export type BuildingConfig = {
  main: Building;
  barracks: Building;
  stable: Building;
  garage: Building;
  watchtower: Building;
  snob: Building;
  smith: Building;
  place: Building;
  statue: Building;
  market: Building;
  wood: Building;
  stone: Building;
  iron: Building;
  farm: Building;
  storage: Building;
  hide: Building;
  wall: Building;
};

export type PlayerNameChange = {
  oldName: Scalars['String'];
  newName: Scalars['String'];
  changeDate: Scalars['Time'];
};

export type TribeHistory = {
  total: Scalars['Int'];
  items?: Maybe<Array<TribeHistoryRecord>>;
};

export type DailyPlayerStats = {
  total: Scalars['Int'];
  items?: Maybe<Array<DailyPlayerStatsRecord>>;
};

export type DailyTribeStats = {
  total: Scalars['Int'];
  items?: Maybe<Array<DailyTribeStatsRecord>>;
};

export type Ennoblement = {
  village?: Maybe<Village>;
  newOwner?: Maybe<Player>;
  newOwnerTribe?: Maybe<Tribe>;
  oldOwner?: Maybe<Player>;
  oldOwnerTribe?: Maybe<Tribe>;
  ennobledAt: Scalars['Time'];
};

export type ServerConfigSnob = {
  gold: Scalars['Int'];
  cheapRebuild: Scalars['Int'];
  rise: Scalars['Int'];
  maxDist: Scalars['Int'];
  factor: Scalars['Float'];
  coinWood: Scalars['Int'];
  coinStone: Scalars['Int'];
  coinIron: Scalars['Int'];
  noBarbConquer: Scalars['Boolean'];
};

export type ServerStatsRecord = {
  activePlayers: Scalars['Int'];
  inactivePlayers: Scalars['Int'];
  players: Scalars['Int'];
  activeTribes: Scalars['Int'];
  inactiveTribes: Scalars['Int'];
  tribes: Scalars['Int'];
  bonusVillages: Scalars['Int'];
  barbarianVillages: Scalars['Int'];
  playerVillages: Scalars['Int'];
  villages: Scalars['Int'];
  createDate: Scalars['Time'];
};

export type DailyTribeStatsFilter = {
  tribeID?: Maybe<Array<Scalars['Int']>>;
  tribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  tribeFilter?: Maybe<TribeFilter>;
  createDate?: Maybe<Scalars['Time']>;
  createDateGT?: Maybe<Scalars['Time']>;
  createDateGTE?: Maybe<Scalars['Time']>;
  createDateLT?: Maybe<Scalars['Time']>;
  createDateLTE?: Maybe<Scalars['Time']>;
};

export type EnnoblementFilterOr = {
  newOwnerID?: Maybe<Array<Scalars['Int']>>;
  newOwnerTribeID?: Maybe<Array<Scalars['Int']>>;
  oldOwnerID?: Maybe<Array<Scalars['Int']>>;
  oldOwnerTribeID?: Maybe<Array<Scalars['Int']>>;
};

export type PlayerHistoryRecord = {
  player?: Maybe<Player>;
  totalVillages: Scalars['Int'];
  points: Scalars['Int'];
  rank: Scalars['Int'];
  rankAtt: Scalars['Int'];
  scoreAtt: Scalars['Int'];
  rankDef: Scalars['Int'];
  scoreDef: Scalars['Int'];
  rankSup: Scalars['Int'];
  scoreSup: Scalars['Int'];
  rankTotal: Scalars['Int'];
  scoreTotal: Scalars['Int'];
  tribe?: Maybe<Tribe>;
  createDate: Scalars['Time'];
};

export type PlayerHistoryFilter = {
  playerID?: Maybe<Array<Scalars['Int']>>;
  playerIDNEQ?: Maybe<Array<Scalars['Int']>>;
  playerFilter?: Maybe<PlayerFilter>;
  createDate?: Maybe<Scalars['Time']>;
  createDateGT?: Maybe<Scalars['Time']>;
  createDateGTE?: Maybe<Scalars['Time']>;
  createDateLT?: Maybe<Scalars['Time']>;
  createDateLTE?: Maybe<Scalars['Time']>;
};

export type ServerConfigAlly = {
  noHarm: Scalars['Int'];
  noOtherSupport: Scalars['Int'];
  allytimeSupport: Scalars['Int'];
  noLeave: Scalars['Int'];
  noJoin: Scalars['Int'];
  limit: Scalars['Int'];
  fixedAllies: Scalars['Int'];
  pointsMemberCount: Scalars['Int'];
  warsMemberRequirement: Scalars['Int'];
  warsPointsRequirement: Scalars['Int'];
  warsAutoacceptDays: Scalars['Int'];
  levels: Scalars['Int'];
  xpRequirements: Scalars['String'];
};

export type TribeChangeFilter = {
  playerID?: Maybe<Array<Scalars['Int']>>;
  playerIDNEQ?: Maybe<Array<Scalars['Int']>>;
  playerFilter?: Maybe<PlayerFilter>;
  oldTribeID?: Maybe<Array<Scalars['Int']>>;
  oldTribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  oldTribeFilter?: Maybe<TribeFilter>;
  newTribeID?: Maybe<Array<Scalars['Int']>>;
  newTribeIDNEQ?: Maybe<Array<Scalars['Int']>>;
  newTribeFilter?: Maybe<TribeFilter>;
  createdAt?: Maybe<Scalars['Time']>;
  createdAtGT?: Maybe<Scalars['Time']>;
  createdAtGTE?: Maybe<Scalars['Time']>;
  createdAtLT?: Maybe<Scalars['Time']>;
  createdAtLTE?: Maybe<Scalars['Time']>;
  or?: Maybe<TribeChangeFilterOr>;
};

export type VersionFilter = {
  code?: Maybe<Array<VersionCode>>;
  codeNEQ?: Maybe<Array<VersionCode>>;
  host?: Maybe<Array<Scalars['String']>>;
  hostNEQ?: Maybe<Array<Scalars['String']>>;
  hostMATCH?: Maybe<Scalars['String']>;
  hostIEQ?: Maybe<Scalars['String']>;
};


export type ServerList = {
  items?: Maybe<Array<Server>>;
  total: Scalars['Int'];
};

export type TribeList = {
  items?: Maybe<Array<Tribe>>;
  total: Scalars['Int'];
};

export type TribeFilterOr = {
  id?: Maybe<Array<Scalars['Int']>>;
  tag?: Maybe<Array<Scalars['String']>>;
  tagIEQ?: Maybe<Scalars['String']>;
  name?: Maybe<Array<Scalars['String']>>;
  nameIEQ?: Maybe<Scalars['String']>;
};

export type TribeFilter = {
  id?: Maybe<Array<Scalars['Int']>>;
  idNEQ?: Maybe<Array<Scalars['Int']>>;
  exists?: Maybe<Scalars['Boolean']>;
  tag?: Maybe<Array<Scalars['String']>>;
  tagNEQ?: Maybe<Array<Scalars['String']>>;
  tagMATCH?: Maybe<Scalars['String']>;
  tagIEQ?: Maybe<Scalars['String']>;
  name?: Maybe<Array<Scalars['String']>>;
  nameNEQ?: Maybe<Array<Scalars['String']>>;
  nameMATCH?: Maybe<Scalars['String']>;
  nameIEQ?: Maybe<Scalars['String']>;
  totalMembers?: Maybe<Scalars['Int']>;
  totalMembersGT?: Maybe<Scalars['Int']>;
  totalMembersGTE?: Maybe<Scalars['Int']>;
  totalMembersLT?: Maybe<Scalars['Int']>;
  totalMembersLTE?: Maybe<Scalars['Int']>;
  totalVillages?: Maybe<Scalars['Int']>;
  totalVillagesGT?: Maybe<Scalars['Int']>;
  totalVillagesGTE?: Maybe<Scalars['Int']>;
  totalVillagesLT?: Maybe<Scalars['Int']>;
  totalVillagesLTE?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Int']>;
  pointsGT?: Maybe<Scalars['Int']>;
  pointsGTE?: Maybe<Scalars['Int']>;
  pointsLT?: Maybe<Scalars['Int']>;
  pointsLTE?: Maybe<Scalars['Int']>;
  allPoints?: Maybe<Scalars['Int']>;
  allPointsGT?: Maybe<Scalars['Int']>;
  allPointsGTE?: Maybe<Scalars['Int']>;
  allPointsLT?: Maybe<Scalars['Int']>;
  allPointsLTE?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  rankGT?: Maybe<Scalars['Int']>;
  rankGTE?: Maybe<Scalars['Int']>;
  rankLT?: Maybe<Scalars['Int']>;
  rankLTE?: Maybe<Scalars['Int']>;
  rankAtt?: Maybe<Scalars['Int']>;
  rankAttGT?: Maybe<Scalars['Int']>;
  rankAttGTE?: Maybe<Scalars['Int']>;
  rankAttLT?: Maybe<Scalars['Int']>;
  rankAttLTE?: Maybe<Scalars['Int']>;
  scoreAtt?: Maybe<Scalars['Int']>;
  scoreAttGT?: Maybe<Scalars['Int']>;
  scoreAttGTE?: Maybe<Scalars['Int']>;
  scoreAttLT?: Maybe<Scalars['Int']>;
  scoreAttLTE?: Maybe<Scalars['Int']>;
  rankDef?: Maybe<Scalars['Int']>;
  rankDefGT?: Maybe<Scalars['Int']>;
  rankDefGTE?: Maybe<Scalars['Int']>;
  rankDefLT?: Maybe<Scalars['Int']>;
  rankDefLTE?: Maybe<Scalars['Int']>;
  scoreDef?: Maybe<Scalars['Int']>;
  scoreDefGT?: Maybe<Scalars['Int']>;
  scoreDefGTE?: Maybe<Scalars['Int']>;
  scoreDefLT?: Maybe<Scalars['Int']>;
  scoreDefLTE?: Maybe<Scalars['Int']>;
  rankTotal?: Maybe<Scalars['Int']>;
  rankTotalGT?: Maybe<Scalars['Int']>;
  rankTotalGTE?: Maybe<Scalars['Int']>;
  rankTotalLT?: Maybe<Scalars['Int']>;
  rankTotalLTE?: Maybe<Scalars['Int']>;
  scoreTotal?: Maybe<Scalars['Int']>;
  scoreTotalGT?: Maybe<Scalars['Int']>;
  scoreTotalGTE?: Maybe<Scalars['Int']>;
  scoreTotalLT?: Maybe<Scalars['Int']>;
  scoreTotalLTE?: Maybe<Scalars['Int']>;
  dominance?: Maybe<Scalars['Int']>;
  dominanceGT?: Maybe<Scalars['Int']>;
  dominanceGTE?: Maybe<Scalars['Int']>;
  dominanceLT?: Maybe<Scalars['Int']>;
  dominanceLTE?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Time']>;
  createdAtGT?: Maybe<Scalars['Time']>;
  createdAtGTE?: Maybe<Scalars['Time']>;
  createdAtLT?: Maybe<Scalars['Time']>;
  createdAtLTE?: Maybe<Scalars['Time']>;
  deletedAt?: Maybe<Scalars['Time']>;
  deletedAtGT?: Maybe<Scalars['Time']>;
  deletedAtGTE?: Maybe<Scalars['Time']>;
  deletedAtLT?: Maybe<Scalars['Time']>;
  deletedAtLTE?: Maybe<Scalars['Time']>;
  or?: Maybe<TribeFilterOr>;
};

export type TribeHistoryRecord = {
  tribe?: Maybe<Tribe>;
  totalVillages: Scalars['Int'];
  totalMembers: Scalars['Int'];
  points: Scalars['Int'];
  allPoints: Scalars['Int'];
  rank: Scalars['Int'];
  dominance: Scalars['Float'];
  rankAtt: Scalars['Int'];
  scoreAtt: Scalars['Int'];
  rankDef: Scalars['Int'];
  scoreDef: Scalars['Int'];
  rankTotal: Scalars['Int'];
  scoreTotal: Scalars['Int'];
  createDate: Scalars['Time'];
};

export type VersionList = {
  items?: Maybe<Array<Version>>;
  total: Scalars['Int'];
};

export type DailyTribeStatsRecord = {
  tribe?: Maybe<Tribe>;
  members: Scalars['Int'];
  villages: Scalars['Int'];
  points: Scalars['Int'];
  allPoints: Scalars['Int'];
  rank: Scalars['Int'];
  rankAtt: Scalars['Int'];
  scoreAtt: Scalars['Int'];
  rankDef: Scalars['Int'];
  scoreDef: Scalars['Int'];
  rankTotal: Scalars['Int'];
  scoreTotal: Scalars['Int'];
  dominance: Scalars['Float'];
  createDate: Scalars['Time'];
};

export type ServerConfigCoord = {
  mapSize: Scalars['Int'];
  func: Scalars['Int'];
  emptyVillages: Scalars['Int'];
  bonusVillages: Scalars['Int'];
  bonusNew: Scalars['Int'];
  inner: Scalars['Int'];
  selectStart: Scalars['Int'];
  villageMoveWait: Scalars['Int'];
  nobleRestart: Scalars['Int'];
  startVillages: Scalars['Int'];
};

export type ServerConfig = {
  speed: Scalars['Float'];
  unitSpeed: Scalars['Float'];
  moral: Scalars['Int'];
  build: ServerConfigBuild;
  misc: ServerConfigMisc;
  commands: ServerConfigCommands;
  newbie: ServerConfigNewbie;
  game: ServerConfigGame;
  buildings: ServerConfigBuildings;
  snob: ServerConfigSnob;
  ally: ServerConfigAlly;
  coord: ServerConfigCoord;
  sitter: ServerConfigSitter;
  sleep: ServerConfigSleep;
  night: ServerConfigNight;
  win: ServerConfigWin;
};

export type TribeChangeFilterOr = {
  oldTribeID?: Maybe<Array<Scalars['Int']>>;
  newTribeID?: Maybe<Array<Scalars['Int']>>;
};

export type TribeChanges = {
  total: Scalars['Int'];
  items?: Maybe<Array<TribeChangeRecord>>;
};

export type DailyPlayerStatsRecord = {
  player?: Maybe<Player>;
  villages: Scalars['Int'];
  points: Scalars['Int'];
  rank: Scalars['Int'];
  rankAtt: Scalars['Int'];
  scoreAtt: Scalars['Int'];
  rankDef: Scalars['Int'];
  scoreDef: Scalars['Int'];
  rankSup: Scalars['Int'];
  scoreSup: Scalars['Int'];
  rankTotal: Scalars['Int'];
  scoreTotal: Scalars['Int'];
  createDate: Scalars['Time'];
};

export type DailyPlayerStatsFilter = {
  playerID?: Maybe<Array<Scalars['Int']>>;
  playerIDNEQ?: Maybe<Array<Scalars['Int']>>;
  playerFilter?: Maybe<PlayerFilter>;
  createDate?: Maybe<Scalars['Time']>;
  createDateGT?: Maybe<Scalars['Time']>;
  createDateGTE?: Maybe<Scalars['Time']>;
  createDateLT?: Maybe<Scalars['Time']>;
  createDateLTE?: Maybe<Scalars['Time']>;
};

export type Player = {
  id: Scalars['Int'];
  name: Scalars['String'];
  totalVillages: Scalars['Int'];
  points: Scalars['Int'];
  rank: Scalars['Int'];
  exists: Scalars['Boolean'];
  rankAtt: Scalars['Int'];
  scoreAtt: Scalars['Int'];
  rankDef: Scalars['Int'];
  scoreDef: Scalars['Int'];
  rankSup: Scalars['Int'];
  scoreSup: Scalars['Int'];
  rankTotal: Scalars['Int'];
  scoreTotal: Scalars['Int'];
  dailyGrowth: Scalars['Int'];
  bestRank: Scalars['Int'];
  bestRankAt: Scalars['Time'];
  mostPoints: Scalars['Int'];
  mostPointsAt: Scalars['Time'];
  mostVillages: Scalars['Int'];
  mostVillagesAt: Scalars['Time'];
  joinedAt: Scalars['Time'];
  lastActivityAt: Scalars['Time'];
  deletedAt?: Maybe<Scalars['Time']>;
  tribe?: Maybe<Tribe>;
  servers: Array<Scalars['String']>;
  nameChanges: Array<PlayerNameChange>;
};

export type PlayerHistory = {
  total: Scalars['Int'];
  items?: Maybe<Array<PlayerHistoryRecord>>;
};

export type ServerFilter = {
  key?: Maybe<Array<Scalars['String']>>;
  keyNEQ?: Maybe<Array<Scalars['String']>>;
  keyMATCH?: Maybe<Scalars['String']>;
  keyIEQ?: Maybe<Scalars['String']>;
  status?: Maybe<Array<ServerStatus>>;
  statusNEQ?: Maybe<Array<ServerStatus>>;
  versionCode?: Maybe<Array<VersionCode>>;
  versionCodeNEQ?: Maybe<Array<VersionCode>>;
};

export type FoundTribe = {
  server: Scalars['String'];
  id: Scalars['Int'];
  tag: Scalars['String'];
  name: Scalars['String'];
  bestRank: Scalars['Int'];
  mostPoints: Scalars['Int'];
  mostVillages: Scalars['Int'];
};

export type VillageFilter = {
  id?: Maybe<Array<Scalars['Int']>>;
  idNEQ?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Array<Scalars['String']>>;
  nameNEQ?: Maybe<Array<Scalars['String']>>;
  nameMATCH?: Maybe<Scalars['String']>;
  nameIEQ?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Int']>;
  pointsGT?: Maybe<Scalars['Int']>;
  pointsGTE?: Maybe<Scalars['Int']>;
  pointsLT?: Maybe<Scalars['Int']>;
  pointsLTE?: Maybe<Scalars['Int']>;
  xGT?: Maybe<Scalars['Int']>;
  xGTE?: Maybe<Scalars['Int']>;
  xLT?: Maybe<Scalars['Int']>;
  xLTE?: Maybe<Scalars['Int']>;
  yGT?: Maybe<Scalars['Int']>;
  yGTE?: Maybe<Scalars['Int']>;
  yLT?: Maybe<Scalars['Int']>;
  yLTE?: Maybe<Scalars['Int']>;
  xy?: Maybe<Array<Scalars['String']>>;
  bonus?: Maybe<Scalars['Int']>;
  bonusGT?: Maybe<Scalars['Int']>;
  bonusGTE?: Maybe<Scalars['Int']>;
  bonusLT?: Maybe<Scalars['Int']>;
  bonusLTE?: Maybe<Scalars['Int']>;
  playerID?: Maybe<Array<Scalars['Int']>>;
  playerIDNEQ?: Maybe<Array<Scalars['Int']>>;
  playerFilter?: Maybe<PlayerFilter>;
};

export type ServerConfigSleep = {
  active: Scalars['Int'];
  delay: Scalars['Int'];
  min: Scalars['Int'];
  max: Scalars['Int'];
  minAwake: Scalars['Int'];
  maxAwake: Scalars['Int'];
  warnTime: Scalars['Int'];
};

export type ServerStats = {
  items?: Maybe<Array<ServerStatsRecord>>;
  total: Scalars['Int'];
};

export type FoundTribeList = {
  items?: Maybe<Array<FoundTribe>>;
  total: Scalars['Int'];
};

export type Unit = {
  buildTime: Scalars['Float'];
  pop: Scalars['Int'];
  speed: Scalars['Float'];
  attack: Scalars['Int'];
  defense: Scalars['Int'];
  defenseCavalry: Scalars['Int'];
  defenseArcher: Scalars['Int'];
  carry: Scalars['Int'];
};

export type VillageList = {
  items?: Maybe<Array<Village>>;
  total: Scalars['Int'];
};
