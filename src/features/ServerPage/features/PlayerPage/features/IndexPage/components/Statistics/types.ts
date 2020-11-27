import { List } from '@libs/graphql/types';

export type Mode =
  | 'points'
  | 'totalVillages'
  | 'scoreAtt'
  | 'scoreDef'
  | 'scoreSup'
  | 'scoreTotal';

export type Item = {
  points: number;
  totalVillages: number;
  scoreAtt: number;
  scoreDef: number;
  scoreSup: number;
  scoreTotal: number;
  createDate: string | Date;
};

export type PlayerHistory = {
  playerHistory?: List<Item[]>;
};
