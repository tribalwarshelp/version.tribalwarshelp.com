import { gql } from '@apollo/client';

export const PLAYERS = gql`
  query players(
    $server: String!
    $filter: PlayerFilter!
    $limit: Int
    $offset: Int
    $sort: [String!]
  ) {
    players(
      server: $server
      filter: $filter
      limit: $limit
      offset: $offset
      sort: $sort
    ) {
      items {
        id
        name
      }
    }
  }
`;

export const TRIBES = gql`
  query tribes(
    $server: String!
    $filter: TribeFilter!
    $limit: Int
    $offset: Int
    $sort: [String!]
  ) {
    tribes(
      server: $server
      filter: $filter
      limit: $limit
      offset: $offset
      sort: $sort
    ) {
      items {
        id
        tag
      }
    }
  }
`;

export const ENNOBLEMENTS = gql`
  query ennoblements(
    $server: String!
    $sideOneTotalGainedFilter: EnnoblementFilter
    $sideOneTotalLostFilter: EnnoblementFilter
    $sideOnePlayersFilter: EnnoblementFilter
    $sideOneTribesFilter: EnnoblementFilter
    $sideTwoTotalGainedFilter: EnnoblementFilter
    $sideTwoTotalLostFilter: EnnoblementFilter
    $sideTwoPlayersFilter: EnnoblementFilter
    $sideTwoTribesFilter: EnnoblementFilter
    $skipSideOnePlayers: Boolean!
    $skipSideOneTribes: Boolean!
    $skipSideTwoPlayers: Boolean!
    $skipSideTwoTribes: Boolean!
  ) {
    sideOneTotalGained: ennoblements(
      server: $server
      filter: $sideOneTotalGainedFilter
    ) {
      total
    }
    sideOneTotalLost: ennoblements(
      server: $server
      filter: $sideOneTotalLostFilter
    ) {
      total
    }
    sideOnePlayers: ennoblements(
      server: $server
      filter: $sideOnePlayersFilter
    ) @skip(if: $skipSideOnePlayers) {
      total
    }
    sideOneTribes: ennoblements(server: $server, filter: $sideOneTribesFilter)
      @skip(if: $skipSideOneTribes) {
      total
    }
    sideTwoTotalGained: ennoblements(
      server: $server
      filter: $sideTwoTotalGainedFilter
    ) {
      total
    }
    sideTwoTotalLost: ennoblements(
      server: $server
      filter: $sideTwoTotalLostFilter
    ) {
      total
    }
    sideTwoPlayers: ennoblements(
      server: $server
      filter: $sideTwoPlayersFilter
    ) @skip(if: $skipSideTwoPlayers) {
      total
    }
    sideTwoTribes: ennoblements(server: $server, filter: $sideTwoTribesFilter)
      @skip(if: $skipSideTwoTribes) {
      total
    }
  }
`;
