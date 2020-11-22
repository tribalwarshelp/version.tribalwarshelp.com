import { gql } from '@apollo/client';

export const SERVERS = gql`
  query servers(
    $filter: ServerFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    servers(filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
      items {
        key
        status
        numberOfPlayers
        numberOfTribes
        numberOfVillages
      }
      total
    }
  }
`;
