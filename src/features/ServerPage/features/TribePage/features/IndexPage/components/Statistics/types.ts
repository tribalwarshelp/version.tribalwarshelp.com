import { List } from '@libs/graphql/types';

export type Mode =
  | 'points'
  | 'totalVillages'
  | 'scoreAtt'
  | 'scoreDef'
  | 'scoreTotal';

export type Item = {
  points: number;
  totalVillages: number;
  scoreAtt: number;
  scoreDef: number;
  scoreTotal: number;
  createDate: string | Date;
};

export type TribeHistory = {
  tribeHistory?: List<Item[]>;
};
