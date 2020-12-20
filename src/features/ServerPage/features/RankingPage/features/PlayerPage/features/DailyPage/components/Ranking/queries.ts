import { gql } from '@apollo/client';

export const DAILY_PLAYER_STATS = gql`
  query dailyPlayerStats(
    $server: String!
    $filter: DailyPlayerStatsFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    dailyPlayerStats(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        player {
          id
          name
          tribe {
            id
            tag
          }
        }
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        points
        villages
        createDate
      }
      total
    }
  }
`;
