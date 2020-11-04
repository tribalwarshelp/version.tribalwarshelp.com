import { gql } from '@apollo/client';

export const SERVERS = gql`
  query servers($filter: ServerFilter) {
    servers(filter: $filter) {
      items {
        key
        status
        numberOfPlayers
        numberOfTribes
        numberOfVillages
        dataUpdatedAt
      }
      total
    }
  }
`;
