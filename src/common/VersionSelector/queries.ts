import { gql } from '@apollo/client';

export const VERSIONS = gql`
  query versions($filter: VersionFilter, $sort: [String!]) {
    versions(filter: $filter, sort: $sort) {
      items {
        code
        host
      }
    }
  }
`;
