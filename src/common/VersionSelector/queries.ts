import { gql } from '@apollo/client';

export const LANG_VERSIONS = gql`
  query langVersions($filter: LangVersionFilter) {
    langVersions(filter: $filter) {
      items {
        tag
        host
      }
    }
  }
`;
