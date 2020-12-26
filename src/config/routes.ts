export const INDEX_PAGE = '/';

export const SEARCH_PAGE = '/search';

export const SERVER_PAGE = {
  BASE: '/server',
  INDEX_PAGE: '/server/:key',
  TRIBE_PAGE: {
    INDEX_PAGE: '/server/:key/tribe/:id',
    MEMBERS_PAGE: '/server/:key/tribe/:id/members',
    HISTORY_PAGE: '/server/:key/tribe/:id/history',
    TRIBE_CHANGES_PAGE: '/server/:key/tribe/:id/tribe-changes',
    ENNOBLEMENTS_PAGE: '/server/:key/tribe/:id/ennoblements',
  },
  PLAYER_PAGE: {
    INDEX_PAGE: '/server/:key/player/:id',
    HISTORY_PAGE: '/server/:key/player/:id/history',
    TRIBE_CHANGES_PAGE: '/server/:key/player/:id/tribe-changes',
    ENNOBLEMENTS_PAGE: '/server/:key/player/:id/ennoblements',
  },
  VILLAGE_PAGE: {
    INDEX_PAGE: '/server/:key/village/:id',
  },
  RANKING_PAGE: {
    BASE: '/server/:key/ranking',
    PLAYER_PAGE: {
      INDEX_PAGE: '/server/:key/ranking/player',
      OD_PAGE: '/server/:key/ranking/player/od',
      DAILY_PAGE: '/server/:key/ranking/player/daily',
      ARCHIVE_PAGE: '/server/:key/ranking/player/archive',
    },
    TRIBE_PAGE: {
      INDEX_PAGE: '/server/:key/ranking/tribe',
      OD_PAGE: '/server/:key/ranking/tribe/od',
      DAILY_PAGE: '/server/:key/ranking/tribe/daily',
      ARCHIVE_PAGE: '/server/:key/ranking/tribe/archive',
    },
  },
  ENNOBLEMENTS_PAGE: '/server/:key/ennoblements',
  MAP_PAGE: '/server/:key/map',
};
