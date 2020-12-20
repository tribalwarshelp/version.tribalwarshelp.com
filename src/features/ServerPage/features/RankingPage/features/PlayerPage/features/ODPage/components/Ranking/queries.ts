import { gql } from '@apollo/client';

export const PLAYERS = gql`
  query players(
    $server: String!
    $filter: PlayerFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    players(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        name
        scoreAtt
        rankAtt
        scoreDef
        rankDef
        scoreSup
        rankSup
        scoreTotal
        rankTotal
        tribe {
          id
          tag
        }
      }
      total
    }
  }
`;
