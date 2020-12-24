import { gql } from '@apollo/client';

export const SERVERS = gql`
  query servers($filter: ServerFilter, $limit: Int) {
    servers(filter: $filter, limit: $limit) {
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
        version {
          code
          host
        }
      }
    }
  }
`;
