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
