import { List } from 'libs/graphql/types';

export type Player = {
  id: number;
  name: string;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreSup: number;
  rankSup: number;
  scoreTotal: number;
  rankTotal: number;
  tribe?: {
    id: number;
    tag: string;
  };
};

export type PlayerList = {
  players?: List<Player[]>;
};
