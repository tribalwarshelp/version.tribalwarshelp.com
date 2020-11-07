import { gql } from '@apollo/client';

export const VERSIONS = gql`
  query versions($filter: VersionFilter) {
    versions(filter: $filter) {
      items {
        code
        host
      }
    }
  }
`;
