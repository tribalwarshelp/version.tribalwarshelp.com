const translations = {
  pageLayout: {
    topBar: {
      home: 'Home',
    },
    sidebar: {
      routes: {
        dashboard: 'Dashboard',
        rankings: {
          name: 'Rankings',
          player: {
            index: 'Players',
            od: 'Players OD',
            daily: `Players - Today's stats`,
            archive: 'Past players',
          },
          tribe: {
            index: 'Tribes',
            od: 'Tribes OD',
            daily: `Tribes - Today's stats`,
            archive: 'Past tribes',
          },
        },
        ennoblements: 'Latest ennoblements',
        map: 'Map tool',
      },
      serverInfo: {
        numberOfPlayers: '{{num}} player',
        numberOfPlayers_plural: '{{num}} players',
        numberOfTribes: '{{num}} tribe',
        numberOfTribes_plural: '{{num}} tribes',
        numberOfVillages: '{{num}} village',
        numberOfVillages_plural: '{{num}} villages',
        dataUpdatedAt: 'The server data was updated {{date}}',
      },
    },
  },
};

export default translations;
