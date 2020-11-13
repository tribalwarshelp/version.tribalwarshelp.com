export const INDEX_PAGE = '/';

export const SERVER_PAGE = {
  BASE: '/server',
  INDEX_PAGE: '/server/:key',
  TRIBE_PAGE: {
    INDEX_PAGE: '/server/:key/tribe/:id',
    HISTORY_PAGE: '/server/:key/tribe/:id/history',
    TRIBE_CHANGES_PAGE: '/server/:key/tribe/:id/tribe-changes',
    CONQUERS_PAGE: '/server/:key/tribe/:id/conquers',
  },
  PLAYER_PAGE: {
    INDEX_PAGE: '/server/:key/player/:id',
    HISTORY_PAGE: '/server/:key/player/:id/history',
    TRIBE_CHANGES_PAGE: '/server/:key/player/:id/tribe-changes',
    CONQUERS_PAGE: '/server/:key/player/:id/conquers',
  },
  VILLAGE_PAGE: {
    INDEX_PAGE: '/server/:key/village/:id',
  },
  RANKINGS_PAGE: {
    PLAYER_PAGE: {
      INDEX_PAGE: '/server/:key/rankings/player',
      OD_PAGE: '/server/:key/rankings/player/od',
      ARCHIVE_PAGE: '/server/:key/rankings/player/archive',
    },
    TRIBE_PAGE: {
      INDEX_PAGE: '/server/:key/rankings/tribe',
      OD_PAGE: '/server/:key/rankings/tribe/od',
      ARCHIVE_PAGE: '/server/:key/rankings/tribe/archive',
    },
  },
  ENNOBLEMENTS_PAGE: '/server/:key/ennoblements',
  MAP_PAGE: '/server/:key/map',
};
