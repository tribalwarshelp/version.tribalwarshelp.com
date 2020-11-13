import { gql } from '@apollo/client';

export const RECENTLY_DELETED_PLAYERS = gql`
  query players($server: String!, $filter: PlayerFilter) {
    players(server: $server, filter: $filter) {
      items {
        id
        name
        mostPoints
        deletedAt
      }
    }
  }
`;
