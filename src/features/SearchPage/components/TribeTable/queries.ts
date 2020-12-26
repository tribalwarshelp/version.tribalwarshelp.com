import { gql } from '@apollo/client';

export const SEARCH_TRIBE = gql`
  query searchTribe(
    $version: String!
    $query: String!
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    foundTribes: searchTribe(
      version: $version
      query: $query
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        server
        id
        tag
        name
        bestRank
        mostPoints
        mostVillages
      }
      total
    }
  }
`;
