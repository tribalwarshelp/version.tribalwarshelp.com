import { gql } from '@apollo/client';

export const PLAYER_HISTORY_AND_DAILY_STATS = gql`
  query playerHistoryAndDailyStats(
    $server: String!
    $playerHistoryFilter: PlayerHistoryFilter
    $dailyPlayerStatsFilter: DailyPlayerStatsFilter
    $sort: [String!]
    $offset: Int
    $playerHistoryLimit: Int
    $dailyPlayerStatsLimit: Int
  ) {
    playerHistory(
      server: $server
      filter: $playerHistoryFilter
      sort: $sort
      limit: $playerHistoryLimit
      offset: $offset
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
      limit: $dailyPlayerStatsLimit
      offset: $offset
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
