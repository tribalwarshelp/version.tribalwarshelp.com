import { gql } from '@apollo/client';

export const VERSIONS = gql`
  query versions($filter: VersionFilter, $sort: [String!], $limit: Int) {
    versions(filter: $filter, sort: $sort, limit: $limit) {
      items {
        code
        host
        timezone
        name
      }
    }
  }
`;
