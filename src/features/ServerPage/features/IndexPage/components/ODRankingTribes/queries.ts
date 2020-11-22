import { gql } from '@apollo/client';

export const TRIBES = gql`
  query tribes(
    $server: String!
    $filter: TribeFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    tribes(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        tag
        scoreAtt
        rankAtt
        scoreDef
        rankDef
        scoreTotal
        rankTotal
      }
    }
  }
`;
