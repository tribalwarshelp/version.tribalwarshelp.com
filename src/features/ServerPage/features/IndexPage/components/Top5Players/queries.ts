import { gql } from '@apollo/client';

export const RECENTLY_DELETED_PLAYERS = gql`
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
        points
        rank
        dailyGrowth
        tribe {
          id
          tag
        }
      }
    }
  }
`;
