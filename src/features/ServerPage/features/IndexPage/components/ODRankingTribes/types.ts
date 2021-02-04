import { List } from 'libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
  scoreAtt: number;
  rankAtt: number;
  scoreDef: number;
  rankDef: number;
  scoreTotal: number;
  rankTotal: number;
};

export type TribesList = {
  tribes?: List<Tribe[]>;
};

export type Mode = 'rankAtt' | 'rankDef' | 'rankTotal';
