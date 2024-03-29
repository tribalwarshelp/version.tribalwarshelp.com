const translations = {
  title: 'Painel de controle - {{key}}',
  recentlyDeletedPlayers: {
    title: 'Jogadores recém removidos',
    columns: {
      name: 'Jogador',
      mostPoints: 'Maior pontuação',
      deletedAt: 'Removido em',
    },
  },
  recentlyDeletedTribes: {
    title: 'Tribos recém removidas',
    columns: {
      name: 'Tribo',
      mostPoints: 'Maior pontuação',
      deletedAt: 'Removida em',
    },
  },
  todaysBestStatsPlayers: {
    title: `Estatística diária (jogadores)`,
    modes: {
      scoreAtt: 'ODA',
      scoreDef: 'ODD',
      scoreSup: 'ODS',
      scoreTotal: 'OD',
      points: 'Pontos',
      villages: 'Aldeias',
    },
    columns: {
      name: 'Jogador',
      score: 'Pontuação',
      createDate: 'Data',
    },
  },
  todaysBestStatsTribes: {
    title: `Estatística diária (tribos)`,
    modes: {
      scoreAtt: 'ODA',
      scoreDef: 'ODD',
      scoreTotal: 'OD',
      points: 'Pontos',
      villages: 'Aldeias',
      members: 'Membros',
    },
    columns: {
      name: 'Tribo',
      score: 'Pontuação',
      createDate: 'Data',
    },
  },
  top5Players: {
    title: 'Classificação de jogador',
    columns: {
      rank: 'Posição',
      name: 'Jogador',
      points: 'Pontos',
      dailyGrowth: 'Evolução diária',
    },
  },
  top5Tribes: {
    title: 'Classificação de tribo',
    columns: {
      rank: 'Posição',
      tag: 'Tribo',
      points: 'Pontos',
      dominance: 'Dominância',
    },
  },
  odRankingPlayers: {
    title: 'OD classificação (jogadores)',
    modes: {
      rankAtt: 'ODA',
      rankDef: 'ODD',
      rankSup: 'ODS',
      rankTotal: 'OD',
    },
    columns: {
      rank: 'Posição',
      name: 'Jogador',
      score: 'Pontuação',
    },
  },
  odRankingTribes: {
    title: 'OD classificação (tribos)',
    modes: {
      rankAtt: 'ODA',
      rankDef: 'ODD',
      rankTotal: 'OD',
    },
    columns: {
      rank: 'Classificação',
      name: 'Tribo',
      score: 'Pontuação',
    },
  },
  playerStatistics: {
    title: 'Jogadores ativos',
    players: 'Jogadores',
  },
  tribeStatistics: {
    title: 'Tribos ativas',
    tribes: 'Tribos',
  },
};

export default translations;
