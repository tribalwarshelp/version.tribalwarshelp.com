import { List, EnnoblementFilter } from '@libs/graphql/types';

export type Tribe = {
  id: number;
  tag: string;
};

export type TribeList = {
  tribes?: List<Tribe[]>;
};

export type Player = {
  id: number;
  name: string;
};

export type PlayerList = {
  players?: List<Player[]>;
};

export type EnnoblementsQueryResult = {
  sideOneTotalGained?: {
    total: number;
  };
  sideOneTotalLost?: {
    total: number;
  };
  sideOnePlayers?: {
    total: number;
  };
  sideOneTribes?: {
    total: number;
  };
  sideTwoTotalGained?: {
    total: number;
  };
  sideTwoTotalLost?: {
    total: number;
  };
  sideTwoPlayers?: {
    total: number;
  };
  sideTwoTribes?: {
    total: number;
  };
};

export type EnnoblementsQueryVariables = {
  server: string;
  sideOneTotalGainedFilter: EnnoblementFilter;
  sideOneTotalLostFilter: EnnoblementFilter;
  sideOnePlayersFilter: EnnoblementFilter;
  sideOneTribesFilter: EnnoblementFilter;
  sideTwoTotalGainedFilter: EnnoblementFilter;
  sideTwoTotalLostFilter: EnnoblementFilter;
  sideTwoPlayersFilter: EnnoblementFilter;
  sideTwoTribesFilter: EnnoblementFilter;
  skipSideOnePlayers: boolean;
  skipSideOneTribes: boolean;
  skipSideTwoPlayers: boolean;
  skipSideTwoTribes: boolean;
};

export type SideResult = {
  gained: number;
  lost: number;
  difference: number;
  againstOppositeSide: number;
};

export type Result = {
  sideOne: SideResult;
  sideTwo: SideResult;
  difference: number;
};
