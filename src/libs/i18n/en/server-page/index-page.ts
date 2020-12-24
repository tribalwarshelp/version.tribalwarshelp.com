const translations = {
  title: 'Dashboard - {{key}}',
  recentlyDeletedPlayers: {
    title: 'Recently deleted players',
    columns: {
      name: 'Player',
      mostPoints: 'Most points',
      deletedAt: 'Deleted at',
    },
  },
  recentlyDeletedTribes: {
    title: 'Recently deleted tribes',
    columns: {
      name: 'Tribe',
      mostPoints: 'Most points',
      deletedAt: 'Deleted at',
    },
  },
  todaysBestStatsPlayers: {
    title: `Daily stats (players)`,
    modes: {
      scoreAtt: 'ODA',
      scoreDef: 'ODD',
      scoreSup: 'ODS',
      scoreTotal: 'OD',
      points: 'Points',
      villages: 'Villages',
    },
    columns: {
      name: 'Player',
      score: 'Score',
      createDate: 'Date',
    },
  },
  todaysBestStatsTribes: {
    title: `Daily stats (tribes)`,
    modes: {
      scoreAtt: 'ODA',
      scoreDef: 'ODD',
      scoreTotal: 'OD',
      points: 'Points',
      villages: 'Villages',
      members: 'Members',
    },
    columns: {
      name: 'Tribe',
      score: 'Score',
      createDate: 'Date',
    },
  },
  top5Players: {
    title: 'Player ranking',
    columns: {
      rank: 'Rank',
      name: 'Player',
      points: 'Points',
      dailyGrowth: 'Daily growth',
    },
  },
  top5Tribes: {
    title: 'Tribe ranking',
    columns: {
      rank: 'Rank',
      tag: 'Tribe',
      points: 'Points',
      dominance: 'Dominance',
    },
  },
  odRankingPlayers: {
    title: 'OD ranking (players)',
    modes: {
      rankAtt: 'ODA',
      rankDef: 'ODD',
      rankSup: 'ODS',
      rankTotal: 'OD',
    },
    columns: {
      rank: 'Rank',
      name: 'Player',
      score: 'Score',
    },
  },
  odRankingTribes: {
    title: 'OD ranking (tribes)',
    modes: {
      rankAtt: 'ODA',
      rankDef: 'ODD',
      rankTotal: 'OD',
    },
    columns: {
      rank: 'Rank',
      name: 'Tribe',
      score: 'Score',
    },
  },
  playerStatistics: {
    title: 'Active players',
    players: 'Players',
  },
  tribeStatistics: {
    title: 'Active tribes',
    tribes: 'Tribes',
  },
};

export default translations;
