import { gql } from '@apollo/client';

export const PLAYERS = gql`
  query players(
    $server: String!
    $filter: PlayerFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    players(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        name
        rank
        points
        totalVillages
      }
      total
    }
  }
`;