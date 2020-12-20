import { gql } from '@apollo/client';

export const DAILY_TRIBE_STATS = gql`
  query dailyTribeStats(
    $server: String!
    $filter: DailyTribeStatsFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    dailyTribeStats(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        tribe {
          id
          tag
        }
        scoreAtt
        scoreDef
        scoreTotal
        points
        villages
        createDate
      }
      total
    }
  }
`;
