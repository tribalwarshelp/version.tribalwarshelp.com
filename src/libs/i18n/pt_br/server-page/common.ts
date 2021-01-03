const translations = {
  pageLayout: {
    topBar: {
      home: 'Página inicial',
    },
    sidebar: {
      routes: {
        dashboard: 'Painel de controle',
        rankings: {
          name: 'Classificações',
          player: {
            index: 'Jogadores',
            od: 'Jogadores OD',
            daily: `Jogadores - Estatística diária`,
            archive: 'Jogadores passados',
          },
          tribe: {
            index: 'Tribos',
            od: 'Tribos OD',
            daily: `Tribos - Estatística diária`,
            archive: 'Tribos passadas',
          },
        },
        ennoblements: 'Noblagens',
        map: 'Ferramente de mapa',
        warStats: 'Estatística de guerra',
      },
      serverInfo: {
        numberOfPlayers: '{{num}} jogador',
        numberOfPlayers_plural: '{{num}} jogadores',
        numberOfTribes: '{{num}} tribo',
        numberOfTribes_plural: '{{num}} tribos',
        numberOfVillages: '{{num}} aldeia',
        numberOfVillages_plural: '{{num}} aldeias',
        dataUpdatedAt: 'Os dados do servidor foram atualizados em {{date}}',
      },
    },
  },
  serverContextProvider: {
    loading: 'Carregando servidor...',
  },
};

export default translations;
