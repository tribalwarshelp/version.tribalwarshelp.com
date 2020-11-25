import { gql } from '@apollo/client';

export const PLAYER = gql`
  query player($server: String!, $id: Int!) {
    player(server: $server, id: $id) {
      id
      name
      exists
      tribe {
        id
        tag
      }
    }
  }
`;
