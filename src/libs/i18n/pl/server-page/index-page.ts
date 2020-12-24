const translations = {
  title: 'Dashboard - {{key}}',
  recentlyDeletedPlayers: {
    title: 'Ostatnio usunięci gracze',
    columns: {
      name: 'Gracz',
      mostPoints: 'Najwięcej punktów',
      deletedAt: 'Usunięty o',
    },
  },
  recentlyDeletedTribes: {
    title: 'Ostatnio usunięte plemiona',
    columns: {
      name: 'Plemię',
      mostPoints: 'Najwięcej punktów',
      deletedAt: 'Usunięty o',
    },
  },
  todaysBestStatsPlayers: {
    title: 'Dzienne statystyki (gracze)',
    modes: {
      scoreAtt: 'Agresor',
      scoreDef: 'Obrońca',
      scoreSup: 'Wspierający',
      scoreTotal: 'Pokonani ogólnie',
      points: 'Punkty',
      villages: 'Wioski',
    },
    columns: {
      name: 'Gracz',
      score: 'Wynik',
      createDate: 'Data',
    },
  },
  todaysBestStatsTribes: {
    title: 'Dzienne statystyki (plemiona)',
    modes: {
      scoreAtt: 'Agresor',
      scoreDef: 'Obrońca',
      scoreTotal: 'Pokonani ogólnie',
      points: 'Punkty',
      villages: 'Wioski',
      members: 'Członkowie',
    },
    columns: {
      name: 'Plemię',
      score: 'Wynik',
      createDate: 'Data',
    },
  },
  top5Players: {
    title: '5 najlepszych graczy',
    columns: {
      rank: 'Ranking',
      name: 'Gracz',
      points: 'Punkty',
      dailyGrowth: 'Dzienny przyrost',
    },
  },
  top5Tribes: {
    title: '5 najlepszych plemion',
    columns: {
      rank: 'Ranking',
      tag: 'Plemię',
      points: 'Punkty',
      dominance: 'Dominacja',
    },
  },
  odRankingPlayers: {
    title: 'Ranking pokonanych przeciwników (gracze)',
    modes: {
      rankAtt: 'Agresor',
      rankDef: 'Obrońca',
      rankSup: 'Wspierający',
      rankTotal: 'Pokonani ogólnie',
    },
    columns: {
      rank: 'Ranking',
      name: 'Gracz',
      score: 'Wynik',
    },
  },
  odRankingTribes: {
    title: 'Ranking pokonanych przeciwników (plemiona)',
    modes: {
      rankAtt: 'Agresor',
      rankDef: 'Obrońca',
      rankSup: 'Wspierający',
      rankTotal: 'Pokonani ogólnie',
    },
    columns: {
      rank: 'Ranking',
      name: 'Plemię',
      score: 'Wynik',
    },
  },
  playerStatistics: {
    title: 'Aktywni gracze',
    players: 'Gracze',
  },
  tribeStatistics: {
    title: 'Aktywne plemiona',
    tribes: 'Plemiona',
  },
};

export default translations;
