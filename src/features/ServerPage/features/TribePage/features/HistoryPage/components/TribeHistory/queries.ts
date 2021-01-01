import { gql } from '@apollo/client';

export const TRIBE_HISTORY_AND_DAILY_STATS = gql`
  query tribeHistoryAndDailyStats(
    $server: String!
    $tribeHistoryFilter: TribeHistoryFilter
    $dailyTribeStatsFilter: DailyTribeStatsFilter
    $sort: [String!]
    $offset: Int
    $tribeHistoryLimit: Int
    $dailyTribeStatsLimit: Int
  ) {
    tribeHistory(
      server: $server
      filter: $tribeHistoryFilter
      sort: $sort
      offset: $offset
      limit: $tribeHistoryLimit
    ) {
      items {
        tribe {
          id
          tag
        }
        points
        rank
        totalVillages
        dominance
        scoreAtt
        rankAtt
        scoreDef
        rankDef
        scoreTotal
        rankTotal
        createDate
      }
      total
    }
    dailyTribeStats(
      server: $server
      filter: $dailyTribeStatsFilter
      sort: $sort
      offset: $offset
      limit: $dailyTribeStatsLimit
    ) {
      items {
        points
        villages
        scoreAtt
        scoreDef
        scoreTotal
        createDate
      }
    }
  }
`;
