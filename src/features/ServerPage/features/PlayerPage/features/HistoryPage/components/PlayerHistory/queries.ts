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
  }
`;
