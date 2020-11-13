import { gql } from '@apollo/client';

export const RECENTLY_DELETED_TRIBES = gql`
  query tribes($server: String!, $filter: TribeFilter) {
    tribes(server: $server, filter: $filter) {
      items {
        id
        name
        mostPoints
        deletedAt
      }
    }
  }
`;
