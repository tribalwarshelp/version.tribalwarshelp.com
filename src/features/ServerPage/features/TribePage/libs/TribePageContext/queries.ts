import { gql } from '@apollo/client';

export const TRIBE = gql`
  query tribe($server: String!, $id: Int!) {
    tribe(server: $server, id: $id) {
      id
      name
      tag
      exists
      rank
      points
      allPoints
      totalVillages
      dominance
      scoreAtt
      rankAtt
      scoreDef
      rankDef
      scoreTotal
      rankTotal
      mostPoints
      mostPointsAt
      mostVillages
      mostVillagesAt
      bestRank
      bestRankAt
      createdAt
      deletedAt
      totalMembers
    }
  }
`;
