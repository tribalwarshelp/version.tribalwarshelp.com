import { gql } from '@apollo/client';

export const PLAYER_HISTORY = gql`
  query playerHistory(
    $server: String!
    $filter: PlayerHistoryFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    playerHistory(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        points
        totalVillages
        scoreAtt
        scoreDef
        scoreSup
        scoreTotal
        createDate
      }
    }
  }
`;
