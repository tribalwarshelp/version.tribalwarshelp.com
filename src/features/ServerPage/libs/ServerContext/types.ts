import { Server as _Server } from 'libs/graphql/types';

export type Params = {
  key: string;
};

export type Server = Pick<
  _Server,
  | 'key'
  | 'numberOfPlayers'
  | 'numberOfTribes'
  | 'numberOfVillages'
  | 'status'
  | 'dataUpdatedAt'
  | 'historyUpdatedAt'
  | 'statsUpdatedAt'
>;
