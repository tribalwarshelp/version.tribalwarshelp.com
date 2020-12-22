import { gql } from '@apollo/client';

export const LIVE_ENNOBLEMENTS = gql`
  query liveEnnoblements($server: String!) {
    liveEnnoblements(server: $server) {
      village {
        name
        x
        y
        id
      }
      newOwner {
        id
        name
        tribe {
          id
          tag
        }
      }
      oldOwner {
        id
        name
        tribe {
          id
          tag
        }
      }
      ennobledAt
    }
  }
`;
