import { gql } from '@apollo/client';

export const STATISTICS = gql`
  query serverStats(
    $server: String!
    $filter: ServerStatsFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    serverStats(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        activeTribes
        createDate
      }
    }
  }
`;
