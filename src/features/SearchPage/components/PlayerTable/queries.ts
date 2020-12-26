import { gql } from '@apollo/client';

export const SEARCH_PLAYER = gql`
  query searchPlayer(
    $version: String!
    $name: String
    $id: Int
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    foundPlayers: searchPlayer(
      version: $version
      name: $name
      id: $id
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        server
        id
        name
        bestRank
        mostPoints
        mostVillages
        tribeID
        tribeTag
      }
      total
    }
  }
`;
