import { gql } from '@apollo/client';

export const ENNOBLEMENTS = gql`
  query ennoblements(
    $server: String!
    $sort: [String!]
    $limit: Int
    $offset: Int
    $filter: EnnoblementFilter
  ) {
    ennoblements(
      server: $server
      filter: $filter
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      items {
        village {
          name
          x
          y
          id
        }
        newOwner {
          id
          name
        }
        newOwnerTribe {
          id
          tag
        }
        oldOwner {
          id
          name
        }
        oldOwnerTribe {
          id
          tag
        }
        ennobledAt
      }
      total
    }
  }
`;
