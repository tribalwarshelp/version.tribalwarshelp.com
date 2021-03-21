import { EnnoblementFilter, Player, Tribe } from 'libs/graphql/types';

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

export type QueryEnnoblementsArgs = {
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
  players: Player[];
  tribes: Tribe[];
  totalVillages: number;
};

export type Results = {
  sideOne: SideResult;
  sideTwo: SideResult;
  difference: number;
};
