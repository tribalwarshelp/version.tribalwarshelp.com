import { gql } from '@apollo/client';

export const DAILY_PLAYER_STATS = gql`
  query dailyPlayerStats($server: String!, $filter: DailyPlayerStatsFilter) {
    dailyPlayerStats(server: $server, filter: $filter) {
      items {
        player {
          id
          name
        }
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        points
        villages
        createDate
      }
    }
  }
`;
