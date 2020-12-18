import { gql } from '@apollo/client';

export const PLAYERS_AND_DAILY_PLAYER_STATS = gql`
  query players(
    $server: String!
    $playerFilter: PlayerFilter
    $playersSort: [String!]
    $limit: Int
    $offset: Int
    $dailyPlayerStatsFilter: DailyPlayerStatsFilter
    $dailyPlayerStatsSort: [String!]
  ) {
    players(
      server: $server
      filter: $playerFilter
      sort: $playersSort
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        name
        rank
        points
        totalVillages
      }
      total
    }
    dailyPlayerStats(
      server: $server
      sort: $dailyPlayerStatsSort
      filter: $dailyPlayerStatsFilter
    ) {
      items {
        points
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        villages
        createDate
        player {
          id
        }
      }
    }
  }
`;
