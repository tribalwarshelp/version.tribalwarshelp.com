const translations = {
  pageLayout: {
    topBar: {
      home: 'Strona główna',
    },
    sidebar: {
      routes: {
        dashboard: 'Dashboard',
        rankings: {
          name: 'Rankingi',
          player: {
            index: 'Gracze',
            od: 'Gracze OD',
            daily: 'Gracze - Dzienne statystyki',
            archive: 'Byli gracze',
          },
          tribe: {
            index: 'Plemiona',
            od: 'Plemiona OD',
            daily: 'Plemiona - Dzienne statystyki',
            archive: 'Byłe plemiona',
          },
        },
        ennoblements: 'Przejęcia',
        map: 'Narzędzie mapy',
        warStats: 'Statystyki wojenne',
      },
      serverInfo: {
        numberOfPlayers_0: '{{num}} gracz',
        numberOfPlayers_1: '{{num}} graczy',
        numberOfPlayers_2: '{{num}} graczy',
        numberOfTribes_0: '{{num}} plemię',
        numberOfTribes_1: '{{num}} plemiona',
        numberOfTribes_2: '{{num}} plemion',
        numberOfVillages_0: '{{num}} wioska',
        numberOfVillages_1: '{{num}} wioski',
        numberOfVillages_2: '{{num}} wiosek',
        dataUpdatedAt: 'Dane ostatnio zaktualizowane {{date}}',
      },
    },
  },
  serverContextProvider: {
    loading: 'Ładowanie serwera...',
  },
};

export default translations;
