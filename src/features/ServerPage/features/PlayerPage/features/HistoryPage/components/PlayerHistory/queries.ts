import { gql } from '@apollo/client';

export const PLAYER_HISTORY_AND_DAILY_STATS = gql`
  query playerHistoryAndDailyStats(
    $server: String!
    $playerHistoryFilter: PlayerHistoryFilter
    $dailyPlayerStatsFilter: DailyPlayerStatsFilter
    $sort: [String!]
    $limit: Int
    $playerHistoryOffset: Int
    $dailyPlayerStatsOffset: Int
  ) {
    playerHistory(
      server: $server
      filter: $playerHistoryFilter
      sort: $sort
      limit: $limit
      offset: $playerHistoryOffset
    ) {
      items {
        tribe {
          id
          tag
        }
        points
        rank
        totalVillages
        scoreAtt
        rankAtt
        scoreDef
        rankDef
        scoreSup
        rankSup
        scoreTotal
        rankTotal
        createDate
      }
      total
    }
    dailyPlayerStats(
      server: $server
      filter: $dailyPlayerStatsFilter
      sort: $sort
      limit: $limit
      offset: $dailyPlayerStatsOffset
    ) {
      items {
        points
        villages
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        createDate
      }
    }
  }
`;
