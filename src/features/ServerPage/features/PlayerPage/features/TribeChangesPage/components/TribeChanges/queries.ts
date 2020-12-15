import { gql } from '@apollo/client';

export const TRIBE_CHANGES = gql`
  query tribeChanges(
    $server: String!
    $filter: TribeChangeFilter
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    tribeChanges(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        oldTribe {
          id
          tag
        }
        newTribe {
          id
          tag
        }
        createdAt
      }
      total
    }
  }
`;
