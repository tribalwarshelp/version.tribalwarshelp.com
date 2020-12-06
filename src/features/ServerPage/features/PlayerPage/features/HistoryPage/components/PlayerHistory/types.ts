import { List } from '@libs/graphql/types';

export type Item = {
  rank: number;
  points: number;
  totalVillages: number;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreSup: number;
  rankSup: number;
  scoreTotal: number;
  rankTotal: number;
  createDate: string | Date;
  tribe?: {
    id: number;
    tag: string;
  };
};

export type PlayerHistory = {
  playerHistory?: List<Item[]>;
};
