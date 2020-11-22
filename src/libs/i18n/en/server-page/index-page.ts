const translations = {
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
    title: `Today's best stats - players`,
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
    title: `Today's best stats - tribes`,
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
    title: '5 best players',
    columns: {
      rank: 'Rank',
      name: 'Player',
      points: 'Points',
      dailyGrowth: 'Daily growth',
    },
  },
  top5Tribes: {
    title: '5 best tribes',
    columns: {
      rank: 'Rank',
      tag: 'Tribe',
      points: 'Points',
      dominance: 'Dominance',
    },
  },
  odRankingPlayers: {
    title: 'OD Ranking - Players',
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
};

export default translations;
