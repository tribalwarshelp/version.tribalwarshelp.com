const translations = {
  recentlyDeletedPlayers: {
    title: 'Ostatnio usunięci gracze',
    columns: {
      name: 'Gracz',
      mostPoints: 'Najwięcej punktów',
      deletedAt: 'Usunięty o',
    },
  },
  recentlyDeletedTribes: {
    title: 'Recently deleted tribes',
    columns: {
      name: 'Plemię',
      mostPoints: 'Najwięcej punktów',
      deletedAt: 'Usunięty o',
    },
  },
  todaysBestStatsPlayers: {
    title: `Dzisiejsze najlepsze statystyki - gracze`,
    modes: {
      scoreAtt: 'ODA',
      scoreDef: 'ODD',
      scoreSup: 'ODS',
      scoreTotal: 'OD',
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
    title: `Dzisiejsze najlepsze statystyki - plemiona`,
    modes: {
      scoreAtt: 'ODA',
      scoreDef: 'ODD',
      scoreTotal: 'OD',
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
};

export default translations;
