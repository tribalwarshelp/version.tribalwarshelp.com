const translations = {
  pageLayout: {
    topBar: {
      home: 'Início',
    },
    sidebar: {
      routes: {
        dashboard: 'Painel de controlo',
        rankings: {
          name: 'Classificações',
          player: {
            index: 'Jogadores',
            od: 'Jogadores OD',
            daily: `Jogadores - Estatísticas do dia`,
            archive: 'Jogadores antigos',
          },
          tribe: {
            index: 'Tribos',
            od: 'Tribos OD',
            daily: `Tribos - Estatísticas do dia`,
            archive: 'Tribos antigos',
          },
        },
        ennoblements: 'Conquistas',
        map: 'Ferramenta de mapa',
        warStats: 'Estatísticas de guerra',
      },
      serverInfo: {
        numberOfPlayers: '{{num}} jogador',
        numberOfPlayers_plural: '{{num}} jogadores',
        numberOfTribes: '{{num}} tribo',
        numberOfTribes_plural: '{{num}} tribos',
        numberOfVillages: '{{num}} aldeia',
        numberOfVillages_plural: '{{num}} aldeias',
        dataUpdatedAt: 'Os dados do servidor foram atualizados a {{date}}',
      },
    },
  },
  serverContextProvider: {
    loading: 'Carregando servidor...',
  },
};

export default translations;
