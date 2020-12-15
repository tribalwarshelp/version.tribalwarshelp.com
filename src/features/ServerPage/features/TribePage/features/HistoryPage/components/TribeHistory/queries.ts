import { gql } from '@apollo/client';

export const TRIBE_HISTORY_AND_DAILY_STATS = gql`
  query tribeHistoryAndDailyStats(
    $server: String!
    $tribeHistoryFilter: TribeHistoryFilter
    $dailyTribeStatsFilter: DailyTribeStatsFilter
    $sort: [String!]
    $limit: Int
    $tribeHistoryOffset: Int
    $dailyTribeStatsOffset: Int
  ) {
    tribeHistory(
      server: $server
      filter: $tribeHistoryFilter
      sort: $sort
      limit: $limit
      offset: $tribeHistoryOffset
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
      limit: $limit
      offset: $dailyTribeStatsOffset
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
