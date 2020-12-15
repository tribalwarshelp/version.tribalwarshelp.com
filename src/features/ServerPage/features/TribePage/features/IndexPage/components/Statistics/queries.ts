import { gql } from '@apollo/client';

export const TRIBE_HISTORY = gql`
  query tribeHistory(
    $server: String!
    $filter: TribeHistoryFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    tribeHistory(
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
        scoreTotal
        createDate
      }
    }
  }
`;
