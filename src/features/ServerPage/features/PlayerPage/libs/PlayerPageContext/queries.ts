import { gql } from '@apollo/client';

export const PLAYER = gql`
  query player($server: String!, $id: Int!) {
    player(server: $server, id: $id) {
      id
      name
      exists
      rank
      points
      totalVillages
      dailyGrowth
      scoreAtt
      rankAtt
      scoreDef
      rankDef
      scoreSup
      rankSup
      scoreTotal
      rankTotal
      mostPoints
      mostPointsAt
      mostVillages
      mostVillagesAt
      bestRank
      bestRankAt
      joinedAt
      servers
      nameChanges {
        oldName
        newName
        changeDate
      }
      tribe {
        id
        tag
      }
    }
  }
`;
