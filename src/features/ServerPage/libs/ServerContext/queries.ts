import { gql } from '@apollo/client';

export const SERVERS = gql`
  query servers($filter: ServerFilter) {
    servers(filter: $filter) {
      total
      items {
        key
        numberOfPlayers
        numberOfTribes
        numberOfVillages
        status
        dataUpdatedAt
        historyUpdatedAt
        statsUpdatedAt
      }
    }
  }
`;
